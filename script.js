(function () {
  const DISK_SELECTED = "disk-selected";

  let selection = null;

  const toggleSelect = ({ classList }) => {
    if (classList.contains(DISK_SELECTED)) {
      classList.remove(DISK_SELECTED);
    } else {
      classList.add(DISK_SELECTED);
    }
  };

  const handleClick = (rod) => () => {
    const {
      dataset: { index },
    } = rod;
    console.log("clicked", index);

    const disks = rod.querySelectorAll(".disk");
    const lastDisk = disks[disks.length - 1];

    if (selection && selection.index !== index) {
      const { disk } = selection;

      if (lastDisk && lastDisk.dataset.index > disk.dataset.index) {
        return;
      }

      disk.remove();
      rod.append(disk);

      toggleSelect(disk);
      selection = null;

      return;
    }

    if (disks.length === 0) {
      return;
    }

    toggleSelect(lastDisk);
    selection = selection ? null : { index, disk: lastDisk };
  };

  const rods = document.querySelectorAll("#board>.rod");
  console.log("rods", rods);

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

  rods.forEach((rod, index) => {
    rod.dataset.index = index;
    rod.addEventListener("click", handleClick(rod));
  });
})();
