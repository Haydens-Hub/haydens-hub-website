document.addEventListener("DOMContentLoaded", () => {
    // Resource Filter Script
    const tableRows = document.querySelectorAll(".resource-table tbody tr");

    const typeSelect = document.getElementById("resource-type");
    const regionSelect = document.getElementById("region");
    const searchInput = document.getElementById("search");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const applyFiltersBtn = document.getElementById("apply-filters");
    const clearFiltersBtn = document.getElementById("clear-filters");

    let activeFilters = { accessibility: [], price: [] };
    let filteredRows = Array.from(tableRows); // initialize with all rows

    // Track button toggles
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filterValue = btn.dataset.filter;

            // Toggle active class
            btn.classList.toggle("bg-primary");
            btn.classList.toggle("text-white");

            if (activeFilters.accessibility.includes(filterValue) || activeFilters.price.includes(filterValue)) {
                activeFilters.accessibility = activeFilters.accessibility.filter(f => f !== filterValue);
                activeFilters.price = activeFilters.price.filter(f => f !== filterValue);
            } else {
                if (["wheelchair", "virtual"].includes(filterValue)) {
                    activeFilters.accessibility.push(filterValue);
                } else {
                    activeFilters.price.push(filterValue);
                }
            }
        });
    });

    function applyFilters() {
        const type = typeSelect.value.toLowerCase();
        const region = regionSelect.value.toLowerCase();
        const searchTerm = searchInput.value.toLowerCase();

        filteredRows = Array.from(tableRows).filter(row => {
            const cells = row.querySelectorAll("td");
            const [orgCell, typeCell, descCell, regionCell, locationCell, accessibilityCell, priceCell] = cells;

            const matchesType = !type || typeCell.textContent.toLowerCase().includes(type);
            const matchesRegion = !region || regionCell.textContent.toLowerCase().includes(region);
            const matchesSearch = !searchTerm || row.textContent.toLowerCase().includes(searchTerm);
            const matchesAccessibility =
                activeFilters.accessibility.length === 0 ||
                activeFilters.accessibility.some(f =>
                    accessibilityCell.textContent.toLowerCase().includes(f)
                );
            const matchesPrice =
                activeFilters.price.length === 0 ||
                activeFilters.price.some(f => {
                    if (f === "free") return priceCell.textContent.toLowerCase().includes("free");
                    if (f === "low-cost") return priceCell.textContent.toLowerCase().includes("low");
                    if (f === "high-cost") return priceCell.textContent.toLowerCase().includes("high");
                    return false;
                });

            return matchesType && matchesRegion && matchesSearch && matchesAccessibility && matchesPrice;
        });

        // Update Filter Status Message
        const statusDiv = document.getElementById("filter-status");
        const anyFilter =
            type || region || searchTerm || activeFilters.accessibility.length > 0 || activeFilters.price.length > 0;

        if (anyFilter) {
            statusDiv.textContent = `Filters applied – showing ${filteredRows.length} result(s). Clear filters to see all.`;
            statusDiv.classList.remove("hidden");
        } else {
            statusDiv.textContent = "";
            statusDiv.classList.add("hidden");
        }

        showPage(1); // Reset to first page
    }

    applyFiltersBtn.addEventListener("click", applyFilters);

    clearFiltersBtn.addEventListener("click", () => {
        typeSelect.value = "";
        regionSelect.value = "";
        searchInput.value = "";
        activeFilters = { accessibility: [], price: [] };

        filterButtons.forEach((btn) => {
            btn.classList.remove("bg-primary", "text-white");
        });

        filteredRows = Array.from(tableRows); // reset to all rows
        showPage(1);

        document.getElementById("filter-status").classList.add("hidden");
    });

    // Pagination Script
    const rowsPerPage = 10; // Change this to control how many per page
    let currentPage = 1;
    const paginationContainer = document.getElementById("pagination");

    function showPage(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        // Hide all rows first
        tableRows.forEach(row => row.style.display = "none");

        // Show only rows in current page
        filteredRows.slice(start, end).forEach(row => row.style.display = "");

        currentPage = page;
        renderPagination();
    }

    function renderPagination() {
        const totalRows = filteredRows.length;
        const pageCount = Math.ceil(totalRows / rowsPerPage);

        paginationContainer.innerHTML = "";

        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.className = `px-3 py-1 border rounded ${i === currentPage ? "bg-primary text-white" : "bg-white"}`;
            btn.addEventListener("click", () => showPage(i));
            paginationContainer.appendChild(btn);
        }
    }

    // Initial Load
    showPage(1);
});
