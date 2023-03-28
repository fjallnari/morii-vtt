export const BG_THEMES = {
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
    "purple": {
        "--clr-bg": "#271A3C",
		"--clr-box-bg-dark": "#2B1D42",
		"--clr-box-bg-normal": "#332244",
		"--clr-box-bg-light": "#3B2645",
		"--clr-box-bg-lighter": "#432B47",
		"--clr-text": "#FCECCB",
    },
    // "mocha": {
    //     "--clr-bg": "#725E51",
	// 	"--clr-box-bg-dark": "#8E7A6E",
	// 	"--clr-box-bg-normal": "#AA968A",
	// 	"--clr-box-bg-light": "#BFAFA6",
	// 	"--clr-box-bg-lighter": "#D4D2D5",
	// 	"--clr-text": "#282624",
    // },
    // "silver": {
    //     "--clr-bg": "#EAEAEA",
	// 	"--clr-box-bg-dark": "#D6D6D6",
	// 	"--clr-box-bg-normal": "#C2C2C2",
	// 	"--clr-box-bg-light": "#ADADAD",
	// 	"--clr-box-bg-lighter": "#A3A3A3",
	// 	"--clr-text": "#32292B",
    // },
    // "rose": {
    //     "--clr-bg": "#f3d2c1",
	// 	"--clr-box-bg-dark": "#fef6e4",
	// 	"--clr-box-bg-normal": "#fadfd7",
	// 	"--clr-box-bg-light": "#FFF0EB",
	// 	"--clr-box-bg-lighter": "#D4D2D5",
	// 	"--clr-text": "#001858",        
    // }
}

export const BG_WAVES = {
    "blue": '../static/bg/waves-blue.svg',
    "cyan": '../static/bg/waves-cyan.svg',
    "salmon": '../static/bg/waves-salmon-b.svg',
    "auburn": '../static/bg/waves-auburn.svg',
    "viridian": '../static/bg/waves-viridian.svg',
    "sea": '../static/bg/waves-sea.svg',
    "purple": '../static/bg/waves-purple.svg',
    // "mocha": '../static/bg/waves-mocha.svg',
    // "silver": '../static/bg/waves-silver.svg'
}

export const THEMES = [
    {
        "id": "default",
        "name": "jungle",
        "--clr-accent-light": "#8BBBA7",
        "--clr-accent-normal": "#549C7E",
        "--clr-accent-dark": "#1C7C54",
        "--clr-accent-darker": "#21513F",
        "--clr-accent-muted": "#1C7C5429",
        "--bg-waves": `url(${BG_WAVES["viridian"]})`,
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
        "--bg-waves": `url(${BG_WAVES["blue"]})`,
        ... BG_THEMES["default"]
    },
    {
        "id": "cyan",
        "name": "frozen lake",
        "--clr-accent-light": "#AAD5DA",
        "--clr-accent-normal": "#547B81",
        "--clr-accent-dark": "#457179",
        "--clr-accent-darker": "#3B5158",
        "--clr-accent-muted": "#45717929",
        "--bg-waves": `url(${BG_WAVES["cyan"]})`,
        ... BG_THEMES["default"]
    },
    // {
    //     "id": "salmon",
    //     "name": "autumn leaves",
    //     "--clr-accent-light": "#FCC8B2",
    //     "--clr-accent-normal": "#EFA48B",
    //     "--clr-accent-dark": "#E9805D",
    //     "--clr-accent-darker": "#875343",
    //     "--clr-accent-muted": "#E9805D29",
    //     "--bg-waves": `url(${BG_WAVES["salmon"]})`,
    //     ... BG_THEMES["default"]
    // },
    {
        "id": "auburn",
        "name": "sunset",
        "--clr-accent-light": "#CE9391",
        "--clr-accent-normal": "#B8605D",
        "--clr-accent-dark": "#A22C29",
        "--clr-accent-darker": "#642929",
        "--clr-accent-muted": "#A22C2929",
        "--bg-waves": `url(${BG_WAVES["auburn"]})`,
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
        "--bg-waves": `url(${BG_WAVES["sea"]})`,
        ... BG_THEMES["sea"]
    },
    {
        "id": "purple",
        "name": "purple haze",
        "--clr-accent-light": "#C17B6C",
        "--clr-accent-normal": "#A85C5C",
        "--clr-accent-dark": "#9C4D54",
        "--clr-accent-darker": "#8F3D4B",
        "--clr-accent-muted": "#9C4D5429",
        "--bg-waves": `url(${BG_WAVES["purple"]})`,
        ... BG_THEMES["purple"]
    },

    // {
    //     "id": "light_green",
    //     "name": "light green",
    //     "--clr-accent-light": "#598567",
    //     "--clr-accent-normal": "#688E74",
    //     "--clr-accent-dark": "#779781",
    //     "--clr-accent-darker": "#869F8E",
    //     "--clr-accent-muted": "#77978129",
    //     "--bg-waves": `url(${BG_WAVES["silver"]})`,
    //     ... BG_THEMES["silver"]
    // },
    // {
    //     "id": "mocha",
    //     "name": "strawberry mocha",
    //     "--clr-accent-light": "#FCC8B2",
    //     "--clr-accent-normal": "#EFA48B",
    //     "--clr-accent-dark": "#E9805D",
    //     "--clr-accent-darker": "#875343",
    //     "--clr-accent-muted": "#E9805D29",
    //     "--bg-waves": `url(${BG_WAVES["mocha"]})`,
    //     ... BG_THEMES["mocha"]
    // },
    // {
    //     "id": "rose",
    //     "name": "rose",
    //     "--clr-accent-light": "#FCC8B2",
    //     "--clr-accent-normal": "#EFA48B",
    //     "--clr-accent-dark": "#E9805D",
    //     "--clr-accent-darker": "#875343",
    //     "--clr-accent-muted": "#E9805D29",
    //     "--bg-waves": `url(${BG_WAVES["rose"]})`,
    //     ... BG_THEMES["rose"]
    // },

    // --clr-accent-light: #A26D54;
    // --clr-accent-normal: #d09172;
    // --clr-accent-dark: #D9906A;
    // --clr-accent-darker: #C38E70;
    // --clr-accent-muted: #D9906A29;
    // --clr-bg: #CD9777;
    // --clr-box-bg-dark: #D69F7E;
    // --clr-box-bg-normal: #DEAB90;
    // --clr-box-bg-light: #E6B8A2;
    // --clr-box-bg-lighter: #EDC4B3;
    // --clr-text: #774936;
]