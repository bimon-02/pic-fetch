import { NextRequest, NextResponse } from "next/server";
const MockPickData = [
  {
    id: "0",
    url: "https://picsum.photos/100/100",
  },
  {
    id: "1",
    url: "https://picsum.photos/200/200",
  },
  {
    id: "2",
    url: "https://picsum.photos/300/300",
  },
  {
    id: "3",
    url: "https://picsum.photos/400/400",
  },
  {
    id: "4",
    url: "https://picsum.photos/500/500",
  },
  {
    id: "5",
    url: "https://picsum.photos/600/600",
  },
  {
    id: "6",
    url: "https://picsum.photos/700/700",
  },
  {
    id: "7",
    url: "https://picsum.photos/800/800",
  },
  {
    id: "8",
    url: "https://picsum.photos/200/300",
  },
  {
    id: "9",
    url: "https://picsum.photos/200/300",
  },
];
// localhost:3000/api/pic?id=2&num=20
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const num = searchParams.get("num");
  let data = MockPickData;

  if (id) {
    data = MockPickData.filter((item) => item.id === id);
  }
  if (num) {
    data = [];
    for (let i = 0; i < Number.parseInt(num); i++) {
      data.push(MockPickData[i % MockPickData.length]);
    }
  }
  return NextResponse.json({
    status: 200,
    data,
  });
}
