import type {
  CompanyInformation,
  EmployeeInformation,
} from "../../../common/types";

import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const interFont = fetch(
  new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const tornApi = `https://api.torn.com/company/?selections=employees&key=${process.env.NEXT_PUBLIC_TORN_COMPANY_API_KEY}`;

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("No ID provided", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const company: CompanyInformation = await fetch(tornApi).then((res) =>
    res.json()
  );

  if (!company) {
    return new Response("No company found", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (!company.company_employees[id]) {
    return new Response("Invalid ID provided", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const employee: EmployeeInformation | undefined =
    company.company_employees[id];

  if (!employee) {
    return new Response("Invalid ID provided", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const inter = await interFont;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          backgroundImage: "url(https://balaclava.vercel.app/ff.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: 600,
          height: 100,
          color: "white",
        }}
      >
        <div tw="flex flex-col justify-between absolute bg-white inset-2 rounded-lg p-2 w-1/3 bg-opacity-20">
          <div tw="flex w-full items-center justify-between text-xl tracking-tight">
            <span tw="">{employee.name}</span>
            <span tw="px-1 bg-white bg-opacity-20 rounded-md ml-2">
              {employee.effectiveness.total}
            </span>
          </div>
          <div tw="flex w-full items-center mb-auto">
            <span tw="text-sm opacity-75">{employee.days_in_company} days</span>
          </div>
          <div tw="flex w-full items-center">
            <span tw="text-xs opacity-75">
              {employee.last_action.status} · {employee.status.state}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 100,
      status: 200,
      // debug: true,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
      },
      fonts: [
        {
          data: inter,
          name: "Inter",
          style: "normal",
        },
      ],
    }
  );
}
