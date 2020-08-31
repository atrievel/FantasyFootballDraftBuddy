CREATE TABLE public.Player (
    id INT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    overallRank INT NOT NULL,
    positionRank VARCHAR(5) NOT NULL,
    byeWeek INT NOT NULL,
    averageDraftPosition FLOAT NOT NULL,
    canDraft BOOLEAN
);

ALTER TABLE public.Player OWNER TO docker;
