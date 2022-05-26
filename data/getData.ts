import axios from 'axios'
import { apiUrls, API_URL } from 'configs/api'

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
export const handleAddParams: (url: string, params: any) => string = (url, params) => {
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

export const getCovers: ({ id: string, option: any }) => any = async ({ id, option }) => {
    const url = handleAddParams(apiUrls.manga() + "/" + id, option)
    const res = await fetch(url)
    const data = await res.json()

    return data
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