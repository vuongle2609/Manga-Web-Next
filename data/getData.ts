import axios from 'axios'
import { apiUrls, API_URL } from 'configs/api'

axios.defaults.baseURL = API_URL;

const proxy = axios.create({
    baseURL: '/'
});

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
                    stringArray = stringArray + item + "[]=" + itemArray + "&"
                })
                apiReturn = apiReturn + stringArray
            } else if (params[item] !== null) {
                // handle generate queries are object
                let stringObj = ''
                for (let oItem in params[item]) {
                    stringObj = stringObj + item + "[" + oItem + "]=" + params[item][oItem] + "&"
                }
                apiReturn = apiReturn + stringObj
            }
        }
    }

    return apiReturn
}

interface loginType {
    username?: string,
    email?: string,
    password: string
}

export const loginUser: (userInfo: loginType) => any = async ({ username, email, password }) => {
    return await proxy.post("/auth/login", { username, email, password }, { headers: { 'Content-Type': 'application/json' } })
}

export const getUser: (token: string) => any = async (token) => {
    console.log({
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
    return await proxy.get("/user/me", {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
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

interface mangaChapterListProps {
    limit: number
    offset: number
    translatedLanguage: string[]
    order: {
        volume: string
        chapter: string
    }
    id: string
    includes: string[]
    contentRating: string[]
}

export const getMangaChapterList: (option: mangaChapterListProps) => any = async ({ id, ...option }) => {
    try {
        const url = handleAddParams(apiUrls.manga() + "/" + id + "/feed", option)
        const data = await axios.get(url)
        return data
    } catch (error) {
        error.response.request._response
    }
}