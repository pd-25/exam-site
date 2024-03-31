import { MarketingConfig } from "types"

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",

      description: "This is the home page",
    },
    {
      title: "About Us",
      href: "/",

      description: "This is the about us page",
    },
    {
      title: "Test Series",
      href: "/",
      description: "This is the test series page",
      items: [
        {
          title: "Prelims",
          href: "/",
          description: "This is the prelims page",
          items: [
            {
              title: "GS",
              href: "/",

              description: "This is the GS page",
            },
            {
              title: "CSAT",
              href: "/",

              description: "This is the CSAT page",
            },
          ],
        },
        {
          title: "Mains",
          href: "/",
          description: "This is the mains page",
          items: [
            {
              title: "GS",
              href: "/",
              description: "This is the GS page",
            },
            {
              title: "Optional",
              href: "/",
              description: "This is the optional page",
            },
          ],
        },
        {
          title: "Optional",
          href: "/",
          description: "This is the optional page",
        },
      ],
    },
    {
      title: "Current Affairs",
      href: "/",
      description: "This is the current affairs page",
    },
  ],
}
