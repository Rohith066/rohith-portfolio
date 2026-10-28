(function () {
  var TRACKS = {
    all: {
      lede: "I build production data pipelines, governed KPI reporting and RAG and agentic LLM systems. 3+ years across data engineering, analytics and applied AI, with an M.S. in Data Analytics Engineering from George Mason University.",
      stats: [
        ["3+ yrs", "across data engineering, analytics and applied AI"],
        ["10,000+", "documents per cycle through a production pipeline"],
        ["87%", "faster reporting turnaround (4 hrs to 30 min)"],
        ["15+", "Power BI executive dashboards"]
      ]
    },
    de: {
      lede: "Data engineer building streaming and batch pipelines: Kafka, Spark Structured Streaming, Delta Lake, dbt, Snowflake and Airflow, deployed with Docker, Terraform and GitHub Actions on AWS.",
      stats: [
        ["10,000+", "documents per cycle, with 40% higher throughput"],
        ["15+", "job board APIs plus thousands of ATS boards, hourly"],
        ["45%", "load time cut over 10M+ record pipelines"],
        ["0", "undetected pipeline failures in the monitored period"]
      ]
    },
    da: {
      lede: "Data analyst who owns the numbers end to end: KPI governance, Power BI and Tableau dashboards, A/B testing, forecasting and segmentation that leadership acts on.",
      stats: [
        ["15+", "Power BI executive dashboards (daily, MBR, QBR)"],
        ["50+", "downstream reports under KPI governance"],
        ["25%", "stockout reduction from an A/B experiment"],
        ["8–12%", "MAPE on ARIMA revenue, margin and cost forecasts"]
      ]
    },
    ai: {
      lede: "Applied AI engineer building RAG and agentic LLM systems with retrieval, guardrails and evaluation harnesses, from FAISS and local Llama 3.2 to Text2SQL routing.",
      stats: [
        ["RAG", "geo-aware agentic RAG with FAISS and local Llama 3.2"],
        ["3x", "faster research turnaround with an agentic router"],
        ["3", "routes: RAG, Text2SQL on DuckDB, direct LLM"],
        ["Evals", "groundedness and hallucination-rate measurement"]
      ]
    }
  };

  var buttons = document.querySelectorAll(".track");
  var lede = document.getElementById("track-lede");
  var stats = document.getElementById("stats");
  var count = document.getElementById("project-count");
  var projects = document.querySelectorAll("#projects .card");
  var bullets = document.querySelectorAll(".job .points li");
  var skills = document.querySelectorAll(".skill-group");

  function matches(el, track) {
    return track === "all" || (el.getAttribute("data-tracks") || "").split(" ").indexOf(track) !== -1;
  }

  function renderStats(list) {
    stats.innerHTML = "";
    list.forEach(function (s) {
      var li = document.createElement("li");
      var strong = document.createElement("strong");
      var span = document.createElement("span");
      strong.textContent = s[0];
      span.textContent = s[1];
      li.appendChild(strong);
      li.appendChild(span);
      stats.appendChild(li);
    });
  }

  function apply(track, push) {
    if (!TRACKS[track]) track = "all";
    var cfg = TRACKS[track];

    buttons.forEach(function (b) {
      b.setAttribute("aria-selected", String(b.getAttribute("data-track") === track));
    });
    lede.textContent = cfg.lede;
    renderStats(cfg.stats);

    var shown = 0;
    projects.forEach(function (p) {
      var on = matches(p, track);
      p.hidden = !on;
      if (on) shown++;
    });
    count.textContent = track === "all" ? shown + " projects" : "Showing " + shown + " of " + projects.length;

    bullets.forEach(function (li) { li.classList.toggle("dim", !matches(li, track)); });
    skills.forEach(function (g) {
      var on = matches(g, track);
      g.classList.toggle("dim", !on);
      g.classList.toggle("hit", on && track !== "all");
    });

    if (push) {
      history.replaceState(null, "", track === "all" ? location.pathname : "#" + track);
    }
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { apply(b.getAttribute("data-track"), true); });
  });

  function fromHash() {
    var t = location.hash.replace("#", "");
    if (TRACKS[t]) apply(t, false);
  }

  window.addEventListener("hashchange", fromHash);
  apply("all", false);
  fromHash();

  document.getElementById("year").textContent = new Date().getFullYear();
})();
