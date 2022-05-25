import axios from 'axios'
import { apiUrls, API_URL, IMG_URL } from 'configs/api'

axios.defaults.baseURL = API_URL;

type order = "asc" | "desc"
type contentRating = "safe" | "suggestive" | "erotica" | "pornographic"
type includes = "cover_art" | "author" | "artist"

interface mangaPropsType {
    limit?: number
    title?: string
    authors?: string[]
    artists?: string[]
    year?: number
    contentRating?: contentRating[]
    includedTags?: string[]
    includedTagsMode?: string
    status?: string[]
    order?: {
        followedCount?: order
        latestUploadedChapter?: order
        relevance?: order
        createdAt?: order
    }
    includes?: includes[]
    originalLanguage?: string[]
    offset?: number
    ids?: string[]
}

// function add params base on option
const handleAddParams: (url: string, params: any) => string = (url, params) => {
    let apiReturn = url + "?"

    // auto add params
    for (let item in params) {
        const itemIsArray = Array.isArray(params[item])
        if (item) {
            if (!itemIsArray && typeof params[item] !== 'object') {
                // handle generate queries are string or number
                apiReturn = apiReturn + `${item}=${params[item]}&`
            } else if (itemIsArray) {
                // handle generate queries are array
                let stringArray = ''
                params[item].forEach((itemArray: string) => {
                    stringArray = stringArray + item + "%5B%5D=" + itemArray + "&"
                })
                apiReturn = apiReturn + stringArray
            } else if (params[item] !== null) {
                // handle generate queries are object
                let stringObj = ''
                for (let oItem in params[item]) {
                    stringObj = stringObj + item + "%5B" + oItem + "%5D=" + params[item][oItem] + "&"
                }
                apiReturn = apiReturn + stringObj
            }
        }
    }


    return apiReturn
}

// get a list of manga
export const getManga: (option: mangaPropsType) => any = async (option) => {
    const url = handleAddParams(apiUrls.manga(), option)
    const data = await axios.get(url)
    return data
}

export const getMangaDetail: ({ id: string, option: mangaPropsType }) => any = async ({ id, option }) => {
    const url = handleAddParams(apiUrls.manga() + "/" + id, option)
    const data = await axios.get(url)
    return data
}

interface coverPropsType {
    id: string
    data: any[]
    quality?: boolean
}

export const getCover: (option: coverPropsType) => any = (option) => {
    if (option.data === undefined)
        return "https://media.discordapp.net/attachments/712591859125321798/977425980211744768/unknown.png?width=545&height=676"

    const cover_art = option.data.find(
        (item: any) => item.type === "cover_art"
    );

    if (cover_art === undefined)
        return "https://media.discordapp.net/attachments/712591859125321798/977425980211744768/unknown.png?width=545&height=676"


    return `https://${IMG_URL}/covers/${option.id}/${cover_art?.attributes?.fileName}${option.quality ? ".512.jpg" : ".256.jpg"}`
}

export const getDetail: (data: any) => any = (data) => {
    const returnObj = {}
    if (data.attributes.title) {
        const title: any = Object.values(data.attributes.title)[0];
        returnObj["title"] = title
    }

    if (data.attributes.altTitles) {
        const subTitleObject: any = data.attributes.altTitles.find(
            (item: any) =>
                (data.attributes.title.en ? item["ja-ro"] : item["en"]) || item["ja"] || true
        );
        const subTitle: any = Object.values(subTitleObject)[0];
        returnObj["subTitle"] = subTitle
    }

    const cover: string = getCover({
        id: data.id,
        data: data.relationships,
    });
    returnObj["cover"] = cover

    let credit = "";
    data.relationships.map((item: any, index: number) => {
        const { type, attributes } = item;
        if (type === "artist" || (type === "author" && attributes.name)) {
            if (!credit.includes(attributes.name)) {
                credit = credit + (index === 0 ? "" : ", ") + attributes.name;
            }
        }
    });
    returnObj["credit"] = credit

    return returnObj
}

export const getCreditDetail: (relationships: any[]) => { artistDetail: any[], authorDetail: any[] } = (relationships) => {
    const returnObj = {
        artistDetail: [],
        authorDetail: []
    }

    relationships.map((item: any) => {
        const { type } = item;
        if (type === "artist") {
            returnObj["artistDetail"].push(item)
        }

        if (type === "author") {
            returnObj["authorDetail"].push(item)
        }
    });

    return returnObj
}

export const getDescription: (description: string) => any = (description) => {
    if (description) {
        let index: number = 0
        const html: string =
            description
                .replace(/---/g, "<hr/>")
                .replace(/\*\*/g, () => { index += 1; return index % 2 === 1 ? "<b>" : "</b><br>" })
                .replace(/- \[(.*?)\]\((.*?)\)/g, (_: string, x: string, y: string) => `<a href="${y}" target="_blank" style="" class="link-desc">${x}</a>`)
                .replace(/ \[(.*?)\]\((.*?)\)/g, (_: string, x: string, y: string) => `&nbsp;<a href="${y}" target="_blank" style="" class="link-desc-1">${x}</a>&nbsp;`)

        return html
    }

    return "This manga doesn't have description yet"
}

export const getOtherNames: (nameObj: any[]) => any = (nameObj) => {
    let liItems: string = ""

    nameObj.forEach((item: any) => {
        liItems += `<p class="link-name">${Object.values(item)[0]}</p>`
    })

    return liItems
}

export const copyToClipboard: (text: string) => any = (text) => {
    if (!navigator.clipboard) {
        // use old commandExec() way
    } else {
        navigator.clipboard.writeText(text).then(
            function () {
                alert("yeah!"); // success 
            })
            .catch(
                function () {
                    alert("err"); // error
                });
    }
}