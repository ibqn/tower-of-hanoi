import "./style.scss";

const DISK_SELECTED = "disk-selected";

let selection = null;

const toggleSelect = ({ classList }) =>
  classList.contains(DISK_SELECTED)
    ? classList.remove(DISK_SELECTED)
    : classList.add(DISK_SELECTED);

const handleClick = (rod) => () => {
  const disks = rod.querySelectorAll(".disk");
  const lastDisk = disks[disks.length - 1];

  if (selection) {
    if (lastDisk && lastDisk.dataset.index > selection.dataset.index) {
      return;
    }

    // selection.remove();
    rod.append(selection);

    toggleSelect(selection);
    selection = null;

    return;
  }

  if (disks.length === 0) {
    return;
  }

  toggleSelect(lastDisk);
  selection = selection ? null : lastDisk;
};

const rods = document.querySelectorAll("#board>.rod");
// console.log("rods", rods);

const [firstRod] = rods;

Array.from({ length: 3 })
  .fill(null)
  .forEach((_, index) => {
    const disk = document.createElement("div");

    disk.classList.add("disk");
    disk.style.setProperty("--disk-index", index);
    disk.dataset.index = index;

    firstRod.appendChild(disk);
  });

rods.forEach((rod) => {
  rod.addEventListener("click", handleClick(rod));
});
