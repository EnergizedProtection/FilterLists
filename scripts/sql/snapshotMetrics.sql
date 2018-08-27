SELECT snapshots.CreatedDateUtc, FilterlistId, HttpStatusCode, WasSuccessful, WaybackTimestamp, COUNT(snapshots_rules.RuleId) AS 'Count'
FROM snapshots
JOIN snapshots_rules ON snapshots.Id = snapshots_rules.SnapshotId
GROUP BY snapshots.Id
ORDER BY snapshots.CreatedDateUtc DESC
LIMIT 50;