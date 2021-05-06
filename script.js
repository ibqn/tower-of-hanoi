(function () {
  const DISK_SELECTED = "disk-selected";

  let selection = null;

  const toggleSelect = (element) => {
    const classes = element.classList;
    if (classes.contains(DISK_SELECTED)) {
      classes.remove(DISK_SELECTED);
    } else {
      classes.add(DISK_SELECTED);
    }
  };

  const handleClick = (event, rod) => {
    const index = rod?.dataset?.index;
    console.log("clicked", index);

    const disks = rod.querySelectorAll(".disk");
    const lastDisk = disks[disks.length - 1];

    if (selection && selection.index !== index) {
      const disk = selection.disk;

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
  rods.forEach((rod, index) => {
    rod.dataset.index = index;
    rod.addEventListener("click", (event) => handleClick(event, rod));
  });
})();
