const BG_THEMES = {
    "default": {
        "--clr-bg": "#1B1B1E",
		"--clr-box-bg-dark": "#212125",
		"--clr-box-bg-normal": "#252529",
		"--clr-box-bg-light": "#303036",
		"--clr-box-bg-lighter": "#56565D",
		"--clr-text": "#F9F9F9",
    },
    "sea": {
        "--clr-bg": "#041F1E",
		"--clr-box-bg-dark": "#0B2323",
		"--clr-box-bg-normal": "#112627",
		"--clr-box-bg-light": "#1E2D2F",
		"--clr-box-bg-lighter": "#3A4747",
		"--clr-text": "#FAF6EF",
    },
    "mocha": {
        "--clr-bg": "#725E51",
		"--clr-box-bg-dark": "#8E7A6E",
		"--clr-box-bg-normal": "#AA968A",
		"--clr-box-bg-light": "#BFAFA6",
		"--clr-box-bg-lighter": "#D4D2D5",
		"--clr-text": "#282624",
    }
}

const THEMES = [
    {
        "id": "default",
        "name": "cyan",
        "--clr-accent-light": "#AAD5DA",
        "--clr-accent-normal": "#547B81",
        "--clr-accent-dark": "#457179",
        "--clr-accent-darker": "#3B5158",
        "--clr-accent-muted": "#45717929",
        "--bg-waves": "url('../static/bg/waves-cyan.svg')",
        ... BG_THEMES["default"]
    },
    {
        "id": "blue",
        "name": "blue mists",
        "--clr-accent-light": "#78A1BB",
        "--clr-accent-normal": "#5A77A1",
        "--clr-accent-dark": "#3C4C87",
        "--clr-accent-darker": "#2C3863",
        "--clr-accent-muted": "#3C4C8729",
        "--bg-waves": "url('../static/bg/waves-blue.svg')",
        ... BG_THEMES["default"]
    },
    {
        "id": "salmon",
        "name": "autumn leaves",
        "--clr-accent-light": "#FCC8B2",
        "--clr-accent-normal": "#EFA48B",
        "--clr-accent-dark": "#E9805D",
        "--clr-accent-darker": "#875343",
        "--clr-accent-muted": "#E9805D29",
        "--bg-waves": "url('../static/bg/waves-salmon-b.svg')",
        ... BG_THEMES["default"]
    },
    {
        "id": "sea",
        "name": "bottom of the sea",
        "--clr-accent-light": "#79B1A3",
        "--clr-accent-normal": "#5F9B8D",
        "--clr-accent-dark": "#417D71",
        "--clr-accent-darker": "#335E57",
        "--clr-accent-muted": "#417D7129",
        "--bg-waves": "url('../static/bg/waves-sea.svg')",
        ... BG_THEMES["sea"]
    },
    // {
    //     "id": "light_red",
    //     "name": "strawberry",
    //     "--clr-accent-light": "#D09385",
    //     "--clr-accent-normal": "#995656",
    //     "--clr-accent-dark": "#A67373",
    //     "--clr-accent-darker": "#845B5B",
    //     "--clr-accent-muted": "#417D7129",
    //     "--bg-waves": "url('../static/bg/waves-sea.svg')",
    //     ... BG_THEMES["mocha"]
    // },
]


export default THEMES;