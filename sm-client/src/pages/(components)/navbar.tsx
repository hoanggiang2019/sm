import React, {useState} from "react";
import {
    Avatar,
    Button,
    Collapse,
    IconButton,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Navbar,
    Typography,
} from "@material-tailwind/react";
import {
    Bars2Icon,
    ChevronDownIcon,
    Cog6ToothIcon,
    CubeTransparentIcon,
    HomeIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PhoneIcon,
    PowerIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import {DialogWithForm} from "@/pages/(components)/login";

// profile menu component
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({label, icon}, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

// nav list component
const navListItems = [
    {
        label: "Home",
        icon: HomeIcon,
    }, {
        label: "Account",
        icon: UserCircleIcon,
    },
    {
        label: "Blocks",
        icon: CubeTransparentIcon,
    },
    {
        label: "Contact",
        icon: PhoneIcon,
    },
];

function NavList() {
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">

            {navListItems.map(({label, icon}, key) => (
                <Typography
                    key={label}
                    as="a"
                    href="#"
                    variant="small"
                    color="gray"
                    className="font-medium text-blue-gray-500"
                >
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, {className: "h-[18px] w-[18px]"})}{" "}
                        <span className="text-gray-900"> {label}</span>
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

export function ComplexNavbar() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);

    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    return (
        <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
            <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
                >
                    CompanyLogo
                </Typography>
                <div className="hidden lg:block">
                    <NavList/>
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6"/>
                </IconButton>

                <DialogWithForm/>


                <ProfileMenu/>
            </div>

            <Collapse open={isNavOpen} className="overflow-scroll">
                <NavList/>
            </Collapse>

        </Navbar>
    );
}