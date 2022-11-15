interface CurrentTimeBarProps {
    today: Date;
    startHour: number;
    step: number;
    minuteHeight: number;
    color?: string;
}
declare const CurrentTimeBar: (props: CurrentTimeBarProps) => JSX.Element | null;
export default CurrentTimeBar;
