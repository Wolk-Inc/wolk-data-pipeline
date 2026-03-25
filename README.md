# wolk-data-pipeline

Zero-config ETL starter with monitoring helpers and pipeline orchestration patterns.

## Features

- ingest JSON and CSV-like records
- transform rows through reusable named steps
- emit pipeline run summaries with step telemetry
- expose health and metrics-friendly output

## Quick start

```bash
npm install
npm run demo
npm run typecheck
```

## Included patterns

- JSON connector
- CSV connector
- reusable country filters
- enrichment and segmentation transforms
- step-level telemetry for lightweight orchestration visibility

Built by [Wolk Inc](https://wolkinc.com).
