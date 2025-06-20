// import {
//     LuLayoutDashboard,
//     LuHandCoins,
//     LuMalletMinimal,
//     LuLogOut
// } from "react-icons/lu";

// export const SIDE_MENU_DATA =
// [
//     {
//         id:"01",
//         label:"Dashboard",
//         icon:LuLayoutDashboard,
//         path:"/dashboard"

//     },
//     {
//         id:"02",
//         label:"Income",
//         icon:LuMalletMinimal,
//         path:"/income"
//     },
//     {
//         id:"03",
//         label:"Expense",
//         icon:LuHandCoins,
//         path:"/expense"
//     },
//     {
//         id:"04",
//         label:"Logout",
//         icon:LuLogOut,
//         path:"/logout"
//     }
// ]


import {
    LuLayoutDashboard,
    LuHandCoins,
    LuBanknote,
    LuLogOut
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/home"
    },
    {
        id: "02",
        label: "Income",
        icon: LuBanknote, // Changed from LuMalletMinimal
        path: "/income"
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense"
    },
    {
        id: "04",
        label: "Logout",
        icon: LuLogOut,
        path: "/logout"
    }
];
