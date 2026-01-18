fetch('data/fps_data.json')
  .then(response => response.json())
  .then(data => {
    let total = data.length;
    let inspected = 0, pending = 0, issue = 0;

    const table = document.getElementById('fpsTable');

    data.forEach(item => {
      if (item.status === "Inspected") inspected++;
      else if (item.status === "Pending") pending++;
      else issue++;

      const row = document.createElement('tr');

      let statusClass = "";
      if (item.status === "Inspected") statusClass = "status-inspected";
      if (item.status === "Pending") statusClass = "status-pending";
      if (item.status === "Issue Found") statusClass = "status-issue";

      row.innerHTML = `
        <td>${item.fps_no}</td>
        <td>${item.block}</td>
        <td>${item.gp}</td>
        <td class="${statusClass}">${item.status}</td>
        <td>${item.last_inspection || "-"}</td>
        <td>${item.remarks || "-"}</td>
      `;

      table.appendChild(row);
    });

    document.querySelector('#totalFps strong').textContent = total;
    document.querySelector('#inspectedFps strong').textContent = inspected;
    document.querySelector('#pendingFps strong').textContent = pending;
    document.querySelector('#issueFps strong').textContent = issue;
  });

// Search filter
document.getElementById('searchBox').addEventListener('keyup', function () {
  let value = this.value.toLowerCase();
  document.querySelectorAll('#fpsTable tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(value) ? '' : 'none';
  });
});
