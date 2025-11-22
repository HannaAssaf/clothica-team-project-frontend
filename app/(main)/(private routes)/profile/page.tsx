import { Metadata } from "next";
import ProfileClient from "./ProfilePage.client";
import { SEO } from "@/config/config";
import { getServerOrders } from "@/lib/api/serverApi";

export const metadata: Metadata = {
    title: "Профіль | " + SEO.Title,
    description: `Ваш особистий профіль на ${SEO.SiteName}.\n${SEO.Description}`,
    keywords: SEO.Keywords,
    openGraph: {
        title: "Профіль | " + SEO.Title,
        description: `Ваш особистий профіль на ${SEO.SiteName}.\n${SEO.Description}`,
        type: "website",
        images: [
            {
                width: 1200,
                height: 630,
                url: SEO.Cover,
                alt: "Профіль | " + SEO.Title,
            }
        ]
    },
    twitter: {
        title: "Профіль | " + SEO.Title,
        description: `Ваш особистий профіль на ${SEO.SiteName}.\n${SEO.Description}`,
        card: "summary_large_image",
        creator: "FlowDevs",
        images: [
            {
                width: 1200,
                height: 630,
                url: SEO.Cover,
                alt: "Профіль | " + SEO.Title,
            }
        ]
    }
};

export default async function ProfilePage() {
    return (
        <ProfileClient ordersList={await getServerOrders()}/>
    );
}