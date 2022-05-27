import { Grid, Pagination } from "@nextui-org/react";
import moment from "moment";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { handleAddParams } from "data/getData";
import { getCover } from "data/handleData";

interface PropsType {
  styles: any;
  mangaData: any;
}

const fetcher: (any) => any = (...config) =>
  fetch(...config).then((res) => res.json());

const MangaArt: FC<PropsType> = ({ styles, mangaData }) => {
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<string[]>([]);

  // const { data, error } = useSWR(
  //   handleAddParams("/mangacover", {
  //     order: {
  //       createdAt: "asc",
  //       updatedAt: "asc",
  //       volume: "asc",
  //     },
  //     manga: [mangaData.id],
  //     limit: 1,
  //     offset: page,
  //   }),
  //   fetcher
  // );

  const data = {
    result: "ok",
    response: "collection",
    data: [
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
      {
        id: "78d8069d-27fe-4fbd-bf66-70f53c27b4c5",
        type: "cover_art",
        attributes: {
          description: "",
          volume: "2",
          fileName: "e1420a23-62ca-4014-b020-951123728fed.jpg",
          locale: "ja",
          createdAt: "2021-05-23T06:53:18+00:00",
          updatedAt: "2021-05-23T06:53:19+00:00",
          version: 2,
        },
        relationships: [
          { id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e", type: "manga" },
          { id: "f8cc4f8a-e596-4618-ab05-ef6572980bbf", type: "user" },
        ],
      },
    ],
    limit: 1,
    offset: 1,
    total: 7,
  };

  // useEffect(() => {

  // }, [data]);

  console.log(data);

  return (
    <div className={styles["manga-sub-content"]}>
      <Grid.Container
        css={{
          flexDirection: "row",
          "@xsMax": {
            flexDirection: "column",
          },
          "@smMax": {
            flexDirection: "row",
          },
          "@mdMax": {
            flexDirection: "row",
          },
          "@lgMax": {
            flexDirection: "row",
          },
        }}
      >
        <Grid
          xl={2}
          lg={2}
          md={3}
          sm={3}
          xs={12}
          css={{
            display: "flex",
            flexDirection: "column",

            "@xsMax": {
              flexDirection: "row",
              flexWrap: "wrap",
            },
            "@smMax": {
              flexDirection: "row",
              flexWrap: "wrap",
            },
            "@mdMax": {
              paddingRight: "$8",
            },
            "@lgMax": {
              paddingRight: "$8",
            },
          }}
        >
          <Pagination total={10} onChange={setPage}></Pagination>
        </Grid>
        <div className={styles["divider"]}></div>
        <Grid
          xl={10}
          lg={10}
          md={9}
          sm={9}
          xs={12}
          css={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "$1",
          }}
        ></Grid>
      </Grid.Container>
    </div>
  );
};

export default MangaArt;
