import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import FixtureMainCard from "./FixtureMainCard";
import { useDispatch } from "react-redux";
import {
  setFixtureId,
  setLeagueName,
  setMarkets,
  setLocation,
  setSportId,
} from "@/store/MarketReducer";
import Loader from "../Loader";
import { setLoader } from "@/store/LoaderReducer";
import clsx from "clsx";
import { IoSyncOutline } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";

const COUNT = 10;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const fetchFixtures = async ({ pageParam, sportId }) => {
  const body = {
    gameStatus: "BET",
    start: pageParam * COUNT,
    count: COUNT,
  };
  if (sportId) {
    body.sportIds = [sportId];
  } else {
    body.sportIds = [6046, 48242, 154830, 35232, 154914, 131506, 687890];
  }
  return fetch(`${BACKEND_URL}/fixtures`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

const Fixtures = ({ sportId }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [isInitialFetch, setInitialFetch] = useState(true);
  const { inView, ref } = useInView();
  const [page, setPage] = useState(0);
  const [sportName, setSportName] = useState("");
  const {
    data: fixtures,
    refetch,
    isSuccess,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["fixtures", sportId],
    queryFn: ({ pageParam }) => fetchFixtures({ pageParam, sportId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.data) {
        if (lastPage.data.total - (page + 1) * COUNT >= 0) {
          return page + 1;
        }
      }
    },
  });

  useEffect(() => {
    setInitialFetch(true);
    setPage(0);
    refetch();
    dispatch(setMarkets([]));
    dispatch(setFixtureId(""));
    dispatch(setLeagueName(""));
    dispatch(setLocation(""));
  }, [sportId]);

  useEffect(() => {
    if (isInitialFetch && fixtures) {
      setInitialFetch(false);
      let market = null;
      let fixtureId;
      let sportName;
      let sportId;
      let leagueName;
      let location;
      if (
        fixtures?.pages &&
        fixtures?.pages?.length > 0 &&
        fixtures?.pages[0].data?.documents &&
        fixtures?.pages[0].data?.documents.length > 0
      ) {
        fixtures?.pages[0].data?.documents?.some((doc) => {
          if (doc?.value?.Markets !== null && doc?.value?.Markets.length > 0) {
            market = doc.value?.Markets;
            fixtureId = doc.value?.FixtureId;
            sportName = doc.value?.Fixture?.Sport?.Name;
            sportId = doc.value?.Fixture?.Sport?.Id;
            leagueName = doc.value?.Fixture?.League?.Name;
            location = doc.value?.Fixture?.Location?.Name;
            return true;
          }
        });
      }
      setSportName(sportName);
      dispatch(setMarkets(market === null ? [] : market));
      dispatch(setFixtureId(fixtureId));
      dispatch(setLeagueName(leagueName));
      dispatch(setLocation(location));
      dispatch(setSportId(sportId));
    }
  }, [fixtures, isInitialFetch]);

  useEffect(() => {
    if (inView && hasNextPage) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    dispatch(setLoader(isFetching));
  }, [isFetching]);

  const findLastElement = (lastPage) => {
    const documents = lastPage.data?.documents;

    for (let i = documents.length - 1; i >= 0; i--) {
      if (
        documents[i].value?.Markets !== null &&
        documents[i].value?.Markets?.length > 0
      ) {
        return documents[i].value?.FixtureId;
      }
    }
    return -1;
  };

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["fixtures"] });
  };

  return (
    <div className="flex flex-col relative h-full">
      <div className="sticky w-full top-0 right-0 flex items-center justify-between p-2 text-white bg-muted rounded-none border-0 z-[1000]">
        <span className="ml-2 uppercase">{sportName ? sportName : "All"}</span>
        <button
          className="flex items-center justify-between leading-none tracking-tight cursor-pointer"
          onClick={() => refreshData()}
        >
          새로고침
          <IoSyncOutline className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="relative flex flex-col h-[95%] overflow-y-scroll">
        <div
          className={clsx("flex flex-col p-4 gap-4", {
            "opacity-10": isFetching,
          })}
        >
          {isSuccess &&
            fixtures?.pages.map((page, i) => {
              let lastElementId;
              if (fixtures?.pages.length === i + 1) {
                lastElementId = findLastElement(page);
              }
              return page?.data?.documents?.map((doc) => {
                if (
                  doc?.value?.Markets !== null &&
                  doc?.value?.Markets?.length > 0
                ) {
                  if (doc.value?.FixtureId === lastElementId) {
                    return (
                      <FixtureMainCard
                        reference={ref}
                        key={doc?.id}
                        id={doc?.id}
                        markets={doc?.value?.Markets}
                        fixture={doc?.value?.Fixture}
                        fixtureId={doc?.value?.FixtureId}
                        sportId={doc?.value?.Fixture?.Sport?.Id}
                      />
                    );
                  } else {
                    return (
                      <FixtureMainCard
                        key={doc?.id}
                        id={doc?.id}
                        markets={doc?.value?.Markets}
                        fixture={doc?.value?.Fixture}
                        fixtureId={doc?.value?.FixtureId}
                        sportId={doc?.value?.Fixture?.Sport?.Id}
                      />
                    );
                  }
                }
              });
            })}
        </div>
      </div>
      {isFetching && (
        <div className="absolute top-0 right-0 flex justify-center items-center h-full w-full z-50">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Fixtures;
