"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BackToCatalog } from "@/components/back-to-catalog";
import { Navbar } from "@/components/navbar";
import { RoomDetailLayout } from "@/components/room-detail-layout";
import { RoomDetailSkeleton } from "@/components/room-detail-skeleton";
import { RoomNotFound } from "@/components/room-not-found";
import { PageContainer } from "@/components/ui/page-container";
import { mockRooms } from "@/data/rooms";
import { type RoomDetail } from "@/types/room";

const RoomDetailPage = () => {
  const params = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [resolvedId, setResolvedId] = useState<string | null>(null);

  const loading = resolvedId !== params.id;

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundRoom = mockRooms.find((item) => item.id === params.id) ?? null;
      setRoom(foundRoom);
      setResolvedId(params.id);
    }, 1000);

    return () => clearTimeout(timer);
  }, [params.id]);

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-zinc-900">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PageContainer>
        <section className="flex flex-col gap-6">
          <BackToCatalog />
          {loading ? <RoomDetailSkeleton /> : null}
          {!loading && room ? <RoomDetailLayout room={room} /> : null}
          {!loading && !room ? <RoomNotFound /> : null}
        </section>
      </PageContainer>
    </div>
  );
};

export default RoomDetailPage;
