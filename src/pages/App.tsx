import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { usePage } from "./hooks";
import { Footer, Header } from "../components";

function App() {
  const {
    handleTabsChange,
    tabIndex,
    value,
    handleChange,
    handleSubmit,
    generateRowAndColumns,
    ref,
    handlePositiveNumber,
    lowestValueMissingNumbers,
    lowestValueOfPositiveNumber,
    handleGenerate,
  } = usePage();

  const is3rdTabIndexDisabled: boolean = generateRowAndColumns.length > 0;

  return (
    <Container maxW="container.md" mt={10}>
      <Header />
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab isDisabled={tabIndex > 0}>Input</Tab>
          <Tab isDisabled={tabIndex > 1}>Table</Tab>
          <Tab isDisabled={!is3rdTabIndexDisabled}>Generate</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <form onSubmit={handleSubmit}>
              <VStack align="start">
                <FormControl>
                  <FormLabel>Number</FormLabel>
                  <Input
                    min={1}
                    max={10000}
                    ref={ref}
                    type="number"
                    required
                    value={value}
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    Fill in the numbers from 1 to 10000
                  </FormHelperText>
                </FormControl>
                <Button colorScheme="teal" type="submit">
                  Submit
                </Button>
              </VStack>
            </form>
          </TabPanel>
          <TabPanel>
            <HStack>
              <Button colorScheme="cyan" onClick={handleGenerate}>
                Generate
              </Button>
              <Button onClick={() => handleTabsChange(2)} colorScheme="teal">
                Next
              </Button>
            </HStack>
            {generateRowAndColumns.length > 0 && (
              <TableContainer my={8}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Numbers</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {generateRowAndColumns.map((val, idx) => (
                      <Tr key={idx}>
                        {Array.isArray(val) &&
                          val.map((el, idxChild) => (
                            <Td key={idxChild}>
                              {lowestValueOfPositiveNumber === el ? (
                                <Tooltip label="Lowest value of positive numbers">
                                  <Tag colorScheme="teal" fontSize="bold">
                                    {lowestValueOfPositiveNumber}
                                  </Tag>
                                </Tooltip>
                              ) : (
                                el
                              )}
                            </Td>
                          ))}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
          <TabPanel>
            <VStack align="start">
              <Button colorScheme="teal" onClick={handlePositiveNumber}>
                Generate Missing Value
              </Button>
              <Text>
                Generated Missing Value:{" "}
                {lowestValueMissingNumbers === Infinity
                  ? "Positive number not found"
                  : lowestValueMissingNumbers}
              </Text>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Footer />
    </Container>
  );
}

export default App;
