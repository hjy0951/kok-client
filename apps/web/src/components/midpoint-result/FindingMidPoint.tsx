"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MapHeader from "./organisms/MapHeader";
import RefreshCenterButton from "./organisms/RefreshCenterButton";
import { Flex } from "@repo/ui/components";
import ParticipantBottomSheet from "@/components/midpoint-result/organisms/ParticipantBottomSheet";
import {
  refreshStyle,
  mapContainer,
  overlayStyle,
  AddLocationButtonPositionStyle,
} from "./style.css";
import {
  useLocationCentroid,
  useLocationConvexHull,
} from "@/hooks/api/useLocation";
import { MarkerItem, NaverMap } from "@repo/naver-map";
import {
  convertToMarkerData,
  convertToPolygonPath,
  convertToCenterMarkerData,
} from "@/utils/location";
import StartBanner from "./organisms/StartBanner";
import AddLocationButton from "./organisms/AddLocationButton";
import { useRoomInfo } from "@/hooks/api/useRoomInfo";
import { useGetStartLocation } from "@/hooks/api/useStartLocation";

interface FindingMidPointProps {
  roomId: string;
  isLeader?: boolean;
}

const FindingMidPoint = ({
  roomId,
  isLeader = false,
}: FindingMidPointProps) => {
  const router = useRouter();
  const {
    data: centroid,
    isLoading: centroidLoading,
    refetch: refetchCentroid,
  } = useLocationCentroid(roomId);
  const {
    data: convH,
    isLoading: convHLoading,
    refetch: refetchConvexHull,
  } = useLocationConvexHull(roomId);
  const markerData = convH ? convertToMarkerData(convH) : [];
  const polygonPath = convH ? convertToPolygonPath(convH) : [];
  const centerMarkerData = centroid
    ? convertToCenterMarkerData({ ...centroid, roomId: roomId })
    : undefined;
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const { data: roomInfo, refetch: refetchRoomInfo } = useRoomInfo(roomId);
  const { data: startLocation } = useGetStartLocation(roomId);

  const handleBannerClose = () => {
    setIsOverlayVisible(false);
  };
  const handleClick = () => {
    setIsBannerVisible(false);
  };

  useEffect(() => {
    if (roomInfo?.data?.nonParticipantCount === 0) {
      router.push(`/result/${roomId}`);
    }
  }, [roomInfo?.data?.nonParticipantCount, roomId, router]);

  let displayMarkerData: MarkerItem[] = [];

  if (markerData.length > 1) {
    displayMarkerData = markerData;
  } else if (startLocation?.latitude && startLocation?.longitude) {
    displayMarkerData = [
      {
        id: "leader-position",
        position: {
          lat: startLocation.latitude,
          lng: startLocation.longitude,
        },
        profileUrl: startLocation.profileImageUrl || "",
      },
    ];
  }

  if (centroidLoading || convHLoading) {
    return <div>Loading...</div>;
  }
  const roomName = roomInfo?.data?.roomName || "";

  return (
    <div className={mapContainer}>
      <Flex direction="column">
        <MapHeader title={roomName} />

        <div className={refreshStyle}>
          <RefreshCenterButton
            coordinates={
              centerMarkerData && markerData.length > 1
                ? {
                    lat: centerMarkerData.latitude,
                    lng: centerMarkerData.longitude,
                  }
                : { lat: 0, lng: 0 }
            }
            participantCount={markerData.length}
            onRefresh={async () => {
              await Promise.all([
                refetchCentroid(),
                refetchConvexHull(),
                refetchRoomInfo(),
              ]);
            }}
          />
        </div>
        <NaverMap
          width="100vw"
          height="100vh"
          markerData={displayMarkerData}
          centerMarker={markerData.length > 1 ? centerMarkerData : undefined}
          polygon={markerData.length > 1 ? polygonPath : []}
        />
        {isOverlayVisible && (
          <div className={overlayStyle} onClick={handleClick} />
        )}
        <Flex className={AddLocationButtonPositionStyle}>
          <AddLocationButton />
        </Flex>
        <ParticipantBottomSheet
          roomId={roomId}
          totalParticipants={roomInfo?.data?.nonParticipantCount} // 소정 TODO
          banner={
            isOverlayVisible && (
              <StartBanner
                roomName={roomName}
                isVisible={isBannerVisible}
                onClose={handleBannerClose}
                onDeleteClick={handleClick}
                isLeader={isLeader}
              />
            )
          }
        />
      </Flex>
    </div>
  );
};

export default FindingMidPoint;
