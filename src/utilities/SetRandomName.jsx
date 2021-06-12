export default function setRandomName() {
  const randomNames = [
    "Dr. Henry Goose",
    "Isaac Sachs ",
    "Dermot Hoggins",
    "Jocasta Ayrs",
    "Captain Molyneux ",
    "Haskell Moore",
    "Robert Frobisher",
    "Lester Rey",
    "Yoona-939 ",
    "Sweeney Todd",
    "Mrs. Lovett",
    "Beadle",
    "Lydia",
    "Beetlejuice",
    "Wade Wilson",
    "Thor",
  ];
  const names = randomNames[Math.floor(Math.random() * randomNames.length)];
  return names;
}
