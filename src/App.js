import React, { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import {
  ChakraProvider,
  Stack,
  Avatar,
  AvatarBadge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Grid,
  Switch,
  InputGroup,
  InputRightElement,
  Icon,
  Box,
  Flex,
  Tag,
  Heading,
  FormControl,
  Text,
  Button
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

const url = "https://BotManager3Commas.mrdorianh.repl.co";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [data, setData] = useState();
  const [base_order_volume, setBase_order_volume] = useState();
  const [start_order_type, setStart_order_type] = useState();
  const [safety_order_volume, setSafety_order_volume] = useState();
  const [
    martingale_volume_coefficient,
    setMartingale_volume_coefficient
  ] = useState();
  const [
    safety_order_step_percentage,
    setSafety_order_step_percentage
  ] = useState();
  const [
    martingale_step_coefficient,
    setMartingale_step_coefficient
  ] = useState();
  const [max_safety_orders, setMax_safety_orders] = useState();
  const [
    active_safety_orders_count,
    setActive_safety_orders_count
  ] = useState();
  const [take_profit, setTake_profit] = useState();
  const [take_profit_type, setTake_profit_type] = useState();
  const [trailing_enabled, setTrailing_enabled] = useState();
  const [trailing_deviation, setTrailing_deviation] = useState();

  const sendData = function (d) {
    for (const property in d) {
      if (d[property] === "") {
        d[property] = data[property];
      }
      console.log(`${property}: ${d[property]}`);
    }
    fetch(`${url}/mirror`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "manual", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(d) // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
    alert("Mirror Successful!");
  };

  const onSubmit = (data) => {
    setData(data);
    sendData(data);
  };

  React.useEffect(() => {
    fetch(`${url}/api`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <ChakraProvider>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          p={10}
          gap={6}
          templateColumns="repeat(auto-fit, minmax(350px, 1fr))"
        >
          <Stack>
            <Box
              backgroundColor="#333333"
              boxShadow="lg"
              borderRadius="lg"
              pl={3}
              pr={3}
              pt={5}
              pb={5}
              opacity={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="stretch"
            >
              <Flex
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                backgroundColor="#555555 "
                borderRadius="lg"
                m={4}
              >
                <Heading
                  size="md"
                  as="h2"
                  lineHeight="shorter"
                  fontWeight="bold"
                  fontFamily="heading"
                  color="white"
                >
                  Mirror Bot
                </Heading>
                <Text color="white" textTransform="capitalize">
                  A Bot that controls all your Bots!
                </Text>
                <Text opacity={1} color="#cecece" fontStyle="italic">
                  Disclaimer: Not associated with 3commas
                </Text>
              </Flex>
              <Stack ml={4} spacing={2} mt={4} mr={4}>
                <Stack
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Tag
                    size="lg"
                    variant="subtle"
                    colorScheme="whiteAlpha"
                    borderRadius="sm"
                    fontSize="sm"
                    color="white"
                    rounded="sm"
                  >
                    Buy Order
                  </Tag>
                </Stack>
                <FormControl>
                  <FormLabel color="white">BO volume ($):</FormLabel>
                  <Input
                    color="white"
                    placeholder={!data ? "" : data.base_order_volume}
                    onChange={(e) => {
                      setBase_order_volume(e.target.value);
                    }}
                    value={base_order_volume}
                    {...register("base_order_volume")}
                  />
                  <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel color="white">
                    Order Type (market/limit):
                  </FormLabel>
                  <Input
                    color="white"
                    placeholder={!data ? "" : data.start_order_type}
                    value={start_order_type}
                    onChange={(e) => {
                      setStart_order_type(e.target.value);
                    }}
                    {...register("start_order_type")}
                  />
                  <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <Alert display="none" variant="left-accent" status="success">
                  <AlertIcon />
                  <AlertTitle mr={1}>Alert!</AlertTitle>
                  <AlertDescription>I'm an Alert preset</AlertDescription>
                </Alert>
              </Stack>
              <Stack ml={4} spacing={2} mt={4} mr={4}>
                <Stack
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Tag
                    size="lg"
                    variant="subtle"
                    colorScheme="whiteAlpha"
                    borderRadius="sm"
                    fontSize="sm"
                    color="white"
                  >
                    Safety Order
                  </Tag>
                </Stack>
                <FormControl>
                  <FormLabel color="white">SO Size ($):</FormLabel>
                  <Input
                    color="white"
                    placeholder={!data ? "" : data.safety_order_volume}
                    onChange={(e) => {
                      setSafety_order_volume(e.target.value);
                    }}
                    value={safety_order_volume}
                    {...register("safety_order_volume")}
                  />
                  <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel color="white">Size Scale:</FormLabel>
                  <Input
                    color="white"
                    placeholder={
                      !data ? "" : data.martingale_volume_coefficient
                    }
                    value={martingale_volume_coefficient}
                    onChange={(e) => {
                      setMartingale_volume_coefficient(e.target.value);
                    }}
                    {...register("martingale_volume_coefficient")}
                  />
                  <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel color="white">
                    Price Deviation to Place Order (%):
                  </FormLabel>
                  <Input
                    color="white"
                    placeholder={!data ? "" : data.safety_order_step_percentage}
                    value={safety_order_step_percentage}
                    onChange={(e) => {
                      setSafety_order_step_percentage(e.target.value);
                    }}
                    {...register("safety_order_step_percentage")}
                  />
                  <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel color="white">
                    SO Price Deviation Step Scale:
                  </FormLabel>
                  <Input
                    color="white"
                    placeholder={!data ? "" : data.martingale_step_coefficient}
                    value={martingale_step_coefficient}
                    onChange={(e) => {
                      setMartingale_step_coefficient(e.target.value);
                    }}
                    {...register("martingale_step_coefficient")}
                  />
                  <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel color="white">Max Safety Orders:</FormLabel>
                  <Input
                    color="white"
                    placeholder={!data ? "" : data.max_safety_orders}
                    value={max_safety_orders}
                    onChange={(e) => {
                      setMax_safety_orders(e.target.value);
                    }}
                    {...register("max_safety_orders")}
                  />
                  <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel color="white">
                    Active Safety Orders Count:
                  </FormLabel>
                  <Input
                    color="white"
                    placeholder={!data ? "" : data.active_safety_orders_count}
                    value={active_safety_orders_count}
                    onChange={(e) => {
                      setActive_safety_orders_count(e.target.value);
                    }}
                    {...register("active_safety_orders_count")}
                  />
                  <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <Alert display="none" variant="left-accent" status="success">
                  <AlertIcon />
                  <AlertTitle mr={1}>Alert!</AlertTitle>
                  <AlertDescription>I'm an Alert preset</AlertDescription>
                </Alert>
              </Stack>
              <Stack ml={4} spacing={2} mt={4} mr={4}>
                <Stack
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Tag
                    size="lg"
                    variant="subtle"
                    colorScheme="whiteAlpha"
                    borderRadius="sm"
                    fontSize="sm"
                    color="white"
                  >
                    Take Profit
                  </Tag>
                </Stack>
                <FormControl>
                  <FormLabel color="white">Take Profit (%):</FormLabel>
                  <Input
                    color="white"
                    placeholder={!data ? "" : data.take_profit}
                    value={take_profit}
                    onChange={(e) => {
                      setTake_profit(e.target.value);
                    }}
                    {...register("take_profit")}
                  />
                  <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel color="white">Take Profit Type:</FormLabel>
                  <Input
                    placeholder={!data ? "" : data.take_profit_type}
                    value={take_profit_type}
                    onChange={(e) => {
                      setTake_profit_type(e.target.value);
                    }}
                    {...register("take_profit_type")}
                    color="white"
                  />
                  <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel color="white">Trailing Enabled:</FormLabel>
                  <Switch
                    isChecked={trailing_enabled}
                    onChange={(e) => {
                      setTrailing_enabled(e.target.value);
                    }}
                    {...register("trailing_enabled")}
                  />
                  <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel color="white">Trailing Deviation (%):</FormLabel>
                  <Input
                    placeholder={!data ? "" : data.trailing_deviation}
                    value={trailing_deviation}
                    color="white"
                    onChange={(e) => {
                      setTrailing_deviation(e.target.value);
                    }}
                    {...register("trailing_deviation")}
                  />
                  <FormErrorMessage>Error message</FormErrorMessage>
                </FormControl>
                <Alert display="none" variant="left-accent" status="success">
                  <AlertIcon />
                  <AlertTitle mr={1}>Alert!</AlertTitle>
                  <AlertDescription>I'm an Alert preset</AlertDescription>
                </Alert>
              </Stack>
              <Stack spacing={2} p={4}>
                <Button
                  variant="solid"
                  size="lg"
                  backgroundColor="#00dba8"
                  type="submit"
                >
                  Push Mirror
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </form>
    </ChakraProvider>
  );
};

export default App;
