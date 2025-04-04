import { classMerge } from "@repo/ui/utils";
import * as Style from "./CardItem.css";
import { motion } from "@repo/motion";
import { Text, Spacing } from "@repo/ui/components";
import { Candidate } from "../templates/type";
import { theme } from "@repo/ui/tokens";
import { SUBWAY_META } from "@/constants/subway";

interface Props extends Candidate {
  view: "card" | "list";
  className: string;
  selected: boolean;
  onSelectCard: (id: number) => void;
}

export function CardItem({
  className,
  view,
  stationId,
  routes,
  transferCount,
  totalTime,
  stationName,
  selected,
  onSelectCard,
}: Props) {
  return (
    <div className={classMerge(className, Style.containerStyle)}>
      <motion.div
        initial={view}
        variants={{
          card: {
            width: 220,
            height: 280,
            // backgroundColor: "transparent",
            transition: { delay: 0.7 },
          },
          list: {
            // backgroundColor: "white",
            width: 335,
            height: 94,
            transition: { delay: 0.5 },
          },
        }}
        animate={view}
        className={Style.cardContainerStyle}
      >
        <motion.div
          initial={view}
          animate={view}
          variants={{
            card: { opacity: 1, transition: { delay: 1.1 } },
            list: { opacity: 0, transition: { duration: 0.5 } },
          }}
          className={Style.innerCardContainerStyle}
        >
          <div className={Style.topContainerStyle}>
            <Text variant="title2" color={theme.colors.text.primary}>
              {stationName}
            </Text>
            <Spacing size={14} />
            <div className={Style.subwayContainer}>
              {routes.map((route) => {
                const subway = Object.entries(SUBWAY_META).find(
                  ([_, value]) => {
                    return value.name === route;
                  }
                );
                if (subway == null) {
                  return null;
                }

                return (
                  <div
                    key={route}
                    style={{ backgroundColor: subway[1].color }}
                    className={Style.subwayItem}
                  >
                    {subway[0]}
                  </div>
                );
              })}
            </div>
            <Spacing size={28} />
            <div className={Style.infoContainer}>
              <div className={Style.infoInnerContainer}>
                <Text
                  color={theme.colors.text.secondary}
                  style={{ fontSize: 13 }}
                >
                  이동 시간
                </Text>
                <Text color={theme.colors.text.secondary} variant="title3">
                  {Math.floor(totalTime / 60)} 분
                </Text>
              </div>
              <div className={Style.line} />
              <div className={Style.infoInnerContainer}>
                <Text
                  color={theme.colors.text.secondary}
                  style={{ fontSize: 13 }}
                >
                  환승
                </Text>
                <Text color={theme.colors.text.secondary} variant="title3">
                  {transferCount ?? 0}회
                </Text>
              </div>
            </div>
            <div className={Style.subwayLine} />
          </div>
          <div className={Style.bottomContainerStyle}>
            <motion.button
              className={Style.cardButtonStyle}
              style={{
                border: `1px solid ${selected ? theme.colors.orange40 : theme.colors.gray15}`,
                backgroundColor: selected
                  ? theme.colors.orange40
                  : theme.colors.gray0,
                color: selected ? "white" : theme.colors.icon.pressed,
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelectCard(stationId)}
            >
              <Text
                color={selected ? "white" : theme.colors.icon.pressed}
                className={Style.cardButtonTitleStyle}
              >
                {"✓ "}콕
              </Text>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
