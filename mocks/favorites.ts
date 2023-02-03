import type { TypefaceTuple } from "types/typeface"

export const validTypefaces: TypefaceTuple[] = [
  [
    "poppins",
    {
      added_at: "Fri Feb 18 2022 11:50:27 GMT+0100 (Central European Standard Time)",
      family: "Poppins",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Poppins"
      },
      slug: "poppins"
    }
  ],
  [
    "robotoSerif",
    {
      added_at: "Fri Feb 18 2022 14:18:39 GMT+0100 (Central European Standard Time)",
      family: "Roboto Serif",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Roboto+Serif"
      },
      slug: "robotoSerif"
    }
  ],
  [
    "openSans",
    {
      added_at: "Sat Feb 19 2022 11:30:01 GMT+0100 (Central European Standard Time)",
      family: "Open Sans",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Open+Sans"
      },
      slug: "openSans"
    }
  ],
  [
    "montserrat",
    {
      added_at: "Sat Feb 19 2022 11:30:39 GMT+0100 (Central European Standard Time)",
      family: "Montserrat",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Montserrat"
      },
      slug: "montserrat"
    }
  ],
  [
    "raleway",
    {
      added_at: "Sat Feb 19 2022 11:32:07 GMT+0100 (Central European Standard Time)",
      family: "Raleway",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Raleway"
      },
      slug: "raleway"
    }
  ],
  [
    "oswald",
    {
      added_at: "Sat Feb 19 2022 11:32:09 GMT+0100 (Central European Standard Time)",
      family: "Oswald",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Oswald"
      },
      slug: "oswald"
    }
  ],
  [
    "inter",
    {
      added_at: "Sat Feb 19 2022 11:32:12 GMT+0100 (Central European Standard Time)",
      family: "Inter",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Inter"
      },
      slug: "inter"
    }
  ],
  [
    "playfairDisplay",
    {
      added_at: "Sat Feb 19 2022 11:32:15 GMT+0100 (Central European Standard Time)",
      family: "Playfair Display",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Playfair+Display"
      },
      slug: "playfairDisplay"
    }
  ],
  [
    "workSans",
    {
      added_at: "Sat Feb 19 2022 11:32:18 GMT+0100 (Central European Standard Time)",
      family: "Work Sans",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Work+Sans"
      },
      slug: "workSans"
    }
  ],
  [
    "barlow",
    {
      added_at: "Sat Feb 19 2022 11:32:21 GMT+0100 (Central European Standard Time)",
      family: "Barlow",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Barlow"
      },
      slug: "barlow"
    }
  ],
  [
    "karla",
    {
      added_at: "Sat Feb 19 2022 11:32:23 GMT+0100 (Central European Standard Time)",
      family: "Karla",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Karla"
      },
      slug: "karla"
    }
  ],
  [
    "bebasNeue",
    {
      added_at: "Sat Feb 19 2022 11:32:25 GMT+0100 (Central European Standard Time)",
      family: "Bebas Neue",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Bebas+Neue"
      },
      slug: "bebasNeue"
    }
  ],
  [
    "notoSerifDisplay",
    {
      added_at: "Sat Feb 19 2022 11:32:28 GMT+0100 (Central European Standard Time)",
      family: "Noto Serif Display",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/noto/specimen/Noto+Serif+Display"
      },
      slug: "notoSerifDisplay"
    }
  ],
  [
    "overpass",
    {
      added_at: "Sat Feb 19 2022 11:32:31 GMT+0100 (Central European Standard Time)",
      family: "Overpass",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Overpass"
      },
      slug: "overpass"
    }
  ]
]

export const invalidAddedAt: TypefaceTuple[] = [
  [
    "poppins",
    {
      added_at: "",
      family: "Poppins",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Poppins"
      },
      slug: "poppins"
    }
  ]
]

export const invalidCollections: TypefaceTuple[] = [
  [
    "poppins",
    {
      added_at: "Fri Feb 18 2022 11:50:27 GMT+0100 (Central European Standard Time)",
      family: "Poppins",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Poppins"
      },
      slug: "poppins"
    }
  ]
]

export const invalidOrigin: TypefaceTuple[] = [
  [
    "openSans",
    {
      added_at: "Fri Feb 18 2022 11:50:27 GMT+0100 (Central European Standard Time)",
      family: "Poppins",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen"
      },
      slug: "poppins"
    }
  ]
]

export const notMatchingSlugs: TypefaceTuple[] = [
  [
    "openSans",
    {
      added_at: "Fri Feb 18 2022 11:50:27 GMT+0100 (Central European Standard Time)",
      family: "Poppins",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Poppins"
      },
      slug: "poppins"
    }
  ]
]

export const invalidStyles: TypefaceTuple[] = [
  [
    "poppins",
    {
      added_at: "Fri Feb 18 2022 11:50:27 GMT+0100 (Central European Standard Time)",
      family: "Poppins",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Poppins"
      },
      slug: "poppins"
    }
  ]
]

export const invalidVariableAxes: TypefaceTuple[] = [
  [
    "poppins",
    {
      added_at: "Fri Feb 18 2022 11:50:27 GMT+0100 (Central European Standard Time)",
      family: "Poppins",
      origin: {
        name: "Google Fonts",
        url: "https://fonts.google.com/specimen/Poppins"
      },
      slug: "poppins"
    }
  ]
]
