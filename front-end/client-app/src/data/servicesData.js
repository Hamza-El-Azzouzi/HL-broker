import {FaHandshake, FaUnlockAlt} from 'react-icons/fa';
import { HiAdjustments } from "react-icons/hi";

import { BiBadgeCheck } from "react-icons/bi";
const servicesData = [
    {
        id: 1,
        icon: <FaHandshake />,
        title: "Your trusted partner in real estate success.",
        // info: "Ships in 24 Hours",
    },
    {
        id: 2,
        icon: <BiBadgeCheck />,
        title: "Expertise that delivers exceptional results.",
        // info: "100% Original products",
    },
    {
        id: 3,
        icon: <HiAdjustments />,
        title: "Personalized service tailored to you.",
        // info: "On all prepaid orders",
    },
    {
        id: 4,
        icon: <FaUnlockAlt />,
        title: "Unlocking opportunities, maximizing returns.",
        // info: "SSL / Secure сertificate",
    },
];

export default servicesData;