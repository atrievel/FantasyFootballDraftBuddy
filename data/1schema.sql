CREATE TABLE public.Player (
    id INT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    overall_rank INT NOT NULL,
    position_rank VARCHAR(5) NOT NULL,
    bye_week INT NOT NULL,
    average_draft_position FLOAT NOT NULL,
    can_draft BOOLEAN
);

-- ALTER TABLE public.Player OWNER TO postgres;
