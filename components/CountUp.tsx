export default function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  return (
    <span aria-label={`${value}${suffix}`}>
      {value}{suffix}
    </span>
  );
}
