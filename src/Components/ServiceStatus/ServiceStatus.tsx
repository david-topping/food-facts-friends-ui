import React from "react";

const convertToMinutes = (time: string) => {
  if (!time) return null;
  const [hour, minPart] = time
    .replace(/(am|pm)/, "")
    .split(":")
    .map(Number);
  const isPM = time.includes("pm");
  const hourInMinutes = ((hour % 12) + (isPM ? 12 : 0)) * 60;
  return hourInMinutes + (minPart || 0);
};

const isServiceOpen = (
  hours: { day: string; open: string; close: string }[]
) => {
  const now = new Date();
  const dayOfWeek = now.toLocaleString("en-uk", { weekday: "long" });
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const todayHours = hours.filter(
    (item) => item.day.toLowerCase() === dayOfWeek.toLowerCase()
  );

  for (const { open, close } of todayHours) {
    const openTime = convertToMinutes(open);
    const closeTime = convertToMinutes(close);

    if (openTime !== null && closeTime !== null) {
      if (currentTime >= openTime && currentTime <= closeTime) {
        return true;
      }
    }
  }

  return false;
};

interface ServiceStatusProps {
  hours: { day: string; open: string; close: string }[];
}

const ServiceStatus: React.FC<ServiceStatusProps> = ({ hours }) => {
  const openStatus = isServiceOpen(hours);
  return (
    <div
      className={`badge ${openStatus ? "bg-success" : "bg-danger"} p-2`}
      style={{ color: "white", fontSize: "1rem" }}
    >
      {openStatus ? "Currently Open" : "Currently Closed"}
    </div>
  );
};

export default ServiceStatus;
