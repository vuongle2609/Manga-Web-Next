import { IMG_URL } from "configs/api";
import _ from "lodash";

interface coverPropsType {
  id: string;
  data: any[];
  quality?: boolean;
  max?: boolean;
}

export const getCover: (option: coverPropsType) => any = (option) => {
  if (option.data === undefined)
    return "https://media.discordapp.net/attachments/712591859125321798/977425980211744768/unknown.png?width=545&height=676";

  const cover_art = option.data.find((item: any) => item.type === "cover_art");

  if (cover_art === undefined)
    return "https://media.discordapp.net/attachments/712591859125321798/977425980211744768/unknown.png?width=545&height=676";

  return `${IMG_URL}/covers/${option.id}/${
    cover_art?.attributes?.fileName
  }${option.max ? "" : option.quality ? ".512.jpg" : ".256.jpg"}`;
};

interface singleCoverPropsType {
  id: string;
  fileName: string;
  quality?: boolean;
  max?: boolean;
}

export const getSingleCover: (option: singleCoverPropsType) => any = (
  option
) => {
  return `${IMG_URL}/covers/${option.id}/${option.fileName}${
    option.max ? "" : option.quality ? ".512.jpg" : ".256.jpg"
  }`;
};

export const getDetail: (data: any) => any = (data) => {
  const returnObj = {};
  if (data.attributes.title) {
    const title: any = Object.values(data.attributes.title)[0];
    returnObj["title"] = title;
  }

  if (data.attributes.altTitles) {
    if (data.attributes.altTitles.length === 0) {
      returnObj["subTitle"] = "";
    } else {
      const subTitleObject: any = data.attributes.altTitles.find(
        (item: any) =>
          (data.attributes.title.en ? item["ja-ro"] : item["en"]) ||
          item["ja"] ||
          true
      );
      const subTitle: any = Object.values(subTitleObject)[0];
      returnObj["subTitle"] = subTitle;
    }
  }

  const cover: string = getCover({
    id: data.id,
    data: data.relationships,
  });
  returnObj["cover"] = cover;

  const maxCover: string = getCover({
    id: data.id,
    data: data.relationships,
    max: true,
  });
  returnObj["maxCover"] = maxCover;

  let credit = "";
  data.relationships.map((item: any, index: number) => {
    const { type, attributes } = item;
    if (type === "artist" || (type === "author" && attributes.name)) {
      if (!credit.includes(attributes.name)) {
        credit = credit + (index === 0 ? "" : ", ") + attributes.name;
      }
    }
  });
  returnObj["credit"] = credit;

  if (data.attributes.links) {
    const links = [];
    for (let key in data.attributes.links) {
      let name: string;
      let link: string;
      switch (key) {
        case "al":
          name = "AniList";
          link = "https://anilist.co/manga/" + data.attributes.links[key];
          break;
        case "ap":
          name = "Anime-Planet";
          link =
            "https://www.anime-planet.com/manga/" + data.attributes.links[key];
          break;
        case "bw":
          name = "Book Walker";
          link = "https://bookwalker.jp/" + data.attributes.links[key];
          break;
        case "mu":
          name = "Manga Updates";
          link =
            "https://www.mangaupdates.com/series.html?id=" +
            data.attributes.links[key];
          break;
        case "nu":
          name = "Novel Updates";
          link =
            "https://www.novelupdates.com/series/" + data.attributes.links[key];
          break;
        case "kt":
          name = "Kitsu";
          link =
            "https://kitsu.io/api/edge/manga/" + data.attributes.links[key];
          break;
        case "amz":
          name = "Amazon";
          link = data.attributes.links[key];
          break;
        case "ebj":
          name = "eBook Japan";
          link = data.attributes.links[key];
          break;
        case "mal":
          name = "My Anime List";
          link = "https://myanimelist.net/manga/" + data.attributes.links[key];
          break;
        case "cdj":
          name = "CD Japan";
          link = data.attributes.links[key];
          break;
        case "raw":
          name = "Offical Raw";
          link = data.attributes.links[key];
          break;
        case "engtl":
          name = "Offical English";
          link = data.attributes.links[key];
          break;
        default:
          name = key;
          link = data.attributes.links[key];
      }
      links.push({
        name,
        link,
      });
    }
    returnObj["links"] = links;
  }

  return returnObj;
};

export const getCreditDetail: (relationships: any[]) => {
  artistDetail: any[];
  authorDetail: any[];
} = (relationships) => {
  const returnObj = {
    artistDetail: [],
    authorDetail: [],
  };

  relationships.map((item: any) => {
    const { type } = item;
    if (type === "artist") {
      returnObj["artistDetail"].push(item);
    }

    if (type === "author") {
      returnObj["authorDetail"].push(item);
    }
  });

  return returnObj;
};

export const getDescription: (description: string) => any = (description) => {
  if (description) {
    let index: number = 0;
    const html: string = description
      .replace(/---/g, "<hr/>")
      .replace(/\*\*/g, () => {
        index += 1;
        return index % 2 === 1 ? "<b>" : "</b><br>";
      })
      .replace(
        /- \[(.*?)\]\((.*?)\)/g,
        (_: string, x: string, y: string) =>
          `<a href="${y}" target="_blank" style="" class="link-desc" rel=”noopener noreferrer” >${x}</a>`
      )
      .replace(
        / \[(.*?)\]\((.*?)\)/g,
        (_: string, x: string, y: string) =>
          `&nbsp;<a href="${y}" target="_blank" style="" class="link-desc-1" rel=”noopener noreferrer” >${x}</a>&nbsp;`
      );

    return html;
  }

  return "This manga doesn't have description yet";
};

export const getOtherNames: (nameObj: any[]) => any = (nameObj) => {
  let liItems: string = "";

  nameObj.forEach((item: any) => {
    liItems += `<p class="link-name">${Object.values(item)[0]}</p>`;
  });

  return liItems;
};

export const getRelatedArr: (relationships: any[]) => any = (relationships) => {
  const enumRelated: string[] = [
    "monochrome",
    "colored",
    "preserialization",
    "serialization",
    "prequel",
    "sequel",
    "main_story",
    "side_story",
    "adapted_from",
    "spin_off",
    "based_on",
    "doujinshi",
    "same_franchise",
    "shared_universe",
    "alternate_story",
    "alternate_version",
  ];

  const filtedArr: any[] = relationships.filter((item: any) =>
    enumRelated.includes(item.related)
  );

  return filtedArr;
};

export const getChapterCredit: (relationships: any[]) => any = (
  relationships
) => {
  const enumRelation: string[] = ["scanlation_group", "user"];

  const filtedArr: any[] = relationships.filter((item: any) =>
    enumRelation.includes(item.type)
  );

  const modifiedArr: any[] = [];

  filtedArr.map((item: any) => {
    const condition: any = modifiedArr.find((e: any) => {
      const eString = e.attributes.username || e.attributes.name;
      const eStringModified = eString.replaceAll(" ", "").toLowerCase();
      const itemString = item.attributes.username || item.attributes.name;
      const itemStringModified = itemString.replaceAll(" ", "").toLowerCase();
      return eStringModified === itemStringModified;
    });
    if (!condition) {
      modifiedArr.push(item);
    }
  });

  return modifiedArr;
};

export const getQueryUrl: (
  queryObj: any,
  newQuery: any,
  diffValue?: string
) => string = ({ page, id, ...queryObj }, newQuery, diffValue) => {
  let query = "?";

  for (let item in queryObj) {
    if (item !== diffValue) {
      query = query + `${item}=${queryObj[item]}&`;
    }
  }

  let newQueryString = "";

  if (Array.isArray(newQuery.value)) {
    if (newQuery.value.length !== 0) {
      const newQueryArrString = newQuery.value.join(",");
      newQueryString = newQuery.key + "=" + newQueryArrString;
    }
  } else if (
    typeof newQuery.value === "string" ||
    typeof newQuery.value === "number"
  ) {
    newQueryString = newQuery.key + "=" + newQuery.value;
  } else {
    newQueryString = `${newQuery.key}=${newQuery.value.type}-${newQuery.value.order}`;
  }

  return query + newQueryString;
};

export const getQueryUrlObj: (queryObj: any) => string = (queryObj) => {
  let query = "?";

  for (let item in queryObj) {
    let newQueryString = "";
    if (Array.isArray(queryObj[item])) {
      if (queryObj[item].length !== 0) {
        const newQueryArrString = queryObj[item].join(",");
        newQueryString = item + "=" + newQueryArrString + "&";
      }
    } else if (
      typeof queryObj[item] === "string" ||
      typeof queryObj[item] === "number"
    ) {
      newQueryString = item + "=" + queryObj[item] + "&";
    }

    query += newQueryString;
  }

  return query;
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const getImageUrl: (
  fileNameArray: string[],
  hash: string,
  dataSaver: boolean
) => string[] = (fileNameArray, hash, dataSaver) => {
  const imageUrlArr = fileNameArray.map(
    (fileName: string) =>
      `${IMG_URL}/${
        dataSaver ? "data-saver" : "data"
      }/${hash}/${fileName}`
  );
  return imageUrlArr;
};
