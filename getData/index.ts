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
                (data.attributes.title.en ? item["ja-ro"] : item["en"]) || item["ja"]
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

export const getDescription: (description: string) => any = (description) => {
    const returnObj = {}
    const text = description.split("---")
    returnObj["description"] = text[0]

    const objString = {}

    let setKey = false
    let setValue = false

    let key = ""
    let value = ""

    for (let i = 0; i < description.length; i += 1) {
        if (setKey && description[i] !== "]") {
            key += description[i]
        }

        if (setValue && description[i] !== ")") {
            value += description[i]
        }

        if (description[i] === "[")
            setKey = true

        if (description[i] === "]") {
            setKey = false
            objString[key] = null
        }

        if (description[i] === "(" && !setKey)
            setValue = true

        if (description[i] === ")" && !setKey) {
            setValue = false
            objString[key] = value
            value = ""
            key = ""
        }
    }

    return objString
} 