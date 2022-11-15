import { Fragment, useState } from "react";
import {
  Button,
  useTheme,
  useMediaQuery,
  Popover,
  MenuList,
  MenuItem,
  IconButton,
} from "@mui/material";
import { WeekDateBtn } from "./WeekDateBtn";
import { DayDateBtn } from "./DayDateBtn";
import { MonthDateBtn } from "./MonthDateBtn";
import { useAppState } from "../../hooks/useAppState";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export type View = "month" | "week" | "day";

const Navigation = () => {
  const { selectedDate, view, week, handleState, getViews, translations, extraAction } =
    useAppState();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const views = getViews();

  const toggleMoreMenu = (el?: Element) => {
    setAnchorEl(el || null);
  };

  const renderDateSelector = () => {
    switch (view) {
      case "month":
        return <MonthDateBtn selectedDate={selectedDate} onChange={handleState} />;
      case "week":
        return <WeekDateBtn selectedDate={selectedDate} onChange={handleState} weekProps={week!} />;
      case "day":
        return <DayDateBtn selectedDate={selectedDate} onChange={handleState} />;
      default:
        return "";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div data-testid="date-navigator">{extraAction ? extraAction : renderDateSelector()}</div>
      <div data-testid="view-navigator" style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            marginRight: 32,
          }}
        >
          <Button onClick={() => handleState(new Date(), "selectedDate")}>
            {translations.navigation.today}
          </Button>
        </div>
        {Boolean(extraAction) && renderDateSelector()}
        {views.length > 1 &&
          (isDesktop ? (
            views.map((v) => (
              <Button
                key={v}
                color={v === view ? "primary" : "inherit"}
                onClick={() => handleState(v, "view")}
                onDragOver={(e) => {
                  e.preventDefault();
                  handleState(v, "view");
                }}
              >
                {translations.navigation[v]}
              </Button>
            ))
          ) : (
            <Fragment>
              <IconButton
                style={{ padding: 5 }}
                onClick={(e) => {
                  toggleMoreMenu(e.currentTarget);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                  toggleMoreMenu();
                }}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuList autoFocusItem={!!anchorEl} disablePadding>
                  {views.map((v) => (
                    <MenuItem
                      key={v}
                      selected={v === view}
                      onClick={() => {
                        toggleMoreMenu();
                        handleState(v, "view");
                      }}
                    >
                      {translations.navigation[v]}
                    </MenuItem>
                  ))}
                </MenuList>
              </Popover>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export { Navigation };
