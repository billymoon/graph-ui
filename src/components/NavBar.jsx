import { Fragment } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Fiona from "fiona";

const navLinks = [
  { label: "explore", href: "/explore/84248c5f-171e-4c84-bdeb-34f44f10cc0f" },
];

const NavLink = ({ href, children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={href}
  >
    {children}
  </Link>
);

export default function Simple({ username }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Graph UI</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {navLinks.map(({ label, href }) => (
                <NavLink key={label} href={href}>
                  {label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {username ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={Fiona(username).img()} />
                </MenuButton>
                <MenuList>
                  <Box mx={3}>Logged in as: {username}</Box>
                  <MenuDivider />
                  <MenuItem as="a" href="/api/auth/signout">
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button as="a" href="/api/auth/signin">
                Sign in through Lichess
              </Button>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {navLinks.map(({ label, href }) => (
                <NavLink key={label} href={href}>
                  {label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Fragment>
  );
}
