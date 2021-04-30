--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Events" (
    id uuid NOT NULL,
    name character varying(255),
    "LocationId" uuid,
    "ScheduleId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Events" OWNER TO postgres;

--
-- Name: Locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Locations" (
    id uuid NOT NULL,
    "locationName" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Locations" OWNER TO postgres;

--
-- Name: Schedules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Schedules" (
    id uuid NOT NULL,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Schedules" OWNER TO postgres;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: Tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tickets" (
    id uuid NOT NULL,
    name character varying(255),
    "EventId" uuid,
    price integer,
    quota integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Tickets" OWNER TO postgres;

--
-- Name: TransactionTickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TransactionTickets" (
    id uuid NOT NULL,
    "TransactionId" uuid,
    "TicketId" uuid,
    amount integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."TransactionTickets" OWNER TO postgres;

--
-- Name: Transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transactions" (
    id uuid NOT NULL,
    "customerName" character varying(255),
    email character varying(255),
    "EventId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Transactions" OWNER TO postgres;

--
-- Data for Name: Events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Events" (id, name, "LocationId", "ScheduleId", "createdAt", "updatedAt") FROM stdin;
5923f768-5699-4a0e-a60f-fa38a71b4b16	Perang Bintang	abbab19f-2f14-4c4b-841c-6422849e08c4	455edaf2-638b-46d4-b2ec-5d5f0af7ce68	2021-05-01 01:15:39.593+07	2021-05-01 01:15:39.593+07
af90b780-aede-4950-8fc2-4c33b9939156	Taste Test Gorry Gourmet	4b0417f6-abc8-4247-b872-b0bdba0cc2cc	fec62905-f16f-4f28-9461-8a1eee174882	2021-05-01 01:17:08.51+07	2021-05-01 01:17:08.51+07
\.


--
-- Data for Name: Locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Locations" (id, "locationName", "createdAt", "updatedAt") FROM stdin;
abbab19f-2f14-4c4b-841c-6422849e08c4	Jl. Menteng Atas Selatan II no. 13	2021-05-01 01:14:50.672+07	2021-05-01 01:14:50.672+07
4b0417f6-abc8-4247-b872-b0bdba0cc2cc	Jl. Perjuangan No.88, RT.11/RW.10	2021-05-01 01:16:45.447+07	2021-05-01 01:16:45.447+07
\.


--
-- Data for Name: Schedules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Schedules" (id, "startDate", "endDate", "createdAt", "updatedAt") FROM stdin;
455edaf2-638b-46d4-b2ec-5d5f0af7ce68	2021-05-02 07:00:00+07	2021-05-02 07:00:00+07	2021-05-01 01:15:39.466+07	2021-05-01 01:15:39.466+07
fec62905-f16f-4f28-9461-8a1eee174882	2021-05-02 07:00:00+07	2021-05-02 07:00:00+07	2021-05-01 01:17:08.378+07	2021-05-01 01:17:08.378+07
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20210430082037-create-event.js
20210430091659-create-location.js
20210430100429-create-schedule.js
20210430111505-create-ticket.js
20210430150154-create-transaction.js
20210430150655-create-transaction-ticket.js
\.


--
-- Data for Name: Tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tickets" (id, name, "EventId", price, quota, "createdAt", "updatedAt") FROM stdin;
157d6812-4d6d-4e05-81c5-9f3acd0d2d21	Standart	af90b780-aede-4950-8fc2-4c33b9939156	100000	50	2021-05-01 01:18:13.857+07	2021-05-01 01:18:13.857+07
57ebc42e-bfb8-48ba-8491-f89ec354af67	Reguler	5923f768-5699-4a0e-a60f-fa38a71b4b16	50000	50	2021-05-01 01:20:55.885+07	2021-05-01 01:20:55.885+07
8bb8d9bd-fbd2-4cb3-955f-24b5501a09d6	VIP	af90b780-aede-4950-8fc2-4c33b9939156	200000	47	2021-05-01 01:18:31.405+07	2021-05-01 01:49:46.009+07
\.


--
-- Data for Name: TransactionTickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TransactionTickets" (id, "TransactionId", "TicketId", amount, "createdAt", "updatedAt") FROM stdin;
107301dd-3ca8-46f2-afd9-7296e2c4312f	2fd56f17-746d-4403-a951-4b08c5e69482	8bb8d9bd-fbd2-4cb3-955f-24b5501a09d6	3	2021-05-01 01:24:47.532+07	2021-05-01 01:24:47.532+07
7243af43-ce3d-4a5a-b004-3c958f011313	5f7e2afb-4438-4efe-a428-a30bd5419651	8bb8d9bd-fbd2-4cb3-955f-24b5501a09d6	1	2021-05-01 01:41:06.991+07	2021-05-01 01:41:06.991+07
daa459d0-6cdf-46d7-b872-4bf7bac3418c	e52ab6a8-fffa-44f6-90e3-939e712b8028	8bb8d9bd-fbd2-4cb3-955f-24b5501a09d6	50	2021-05-01 01:41:24.959+07	2021-05-01 01:41:24.959+07
4398e9d0-27ee-4a34-abc8-9e1732f1dce6	ff35c728-7b97-4e80-ad4a-c5f0ea48ab89	8bb8d9bd-fbd2-4cb3-955f-24b5501a09d6	50	2021-05-01 01:44:06.852+07	2021-05-01 01:44:06.852+07
932a9068-326a-45b0-a7ca-70ea634fe96b	57e24748-93c7-475f-9464-ba8fee65002b	8bb8d9bd-fbd2-4cb3-955f-24b5501a09d6	50	2021-05-01 01:49:26.44+07	2021-05-01 01:49:26.44+07
ea458996-6e34-43da-9d65-f10a80b25250	5d580854-4a8f-41fd-a7e0-44e0ab32f075	8bb8d9bd-fbd2-4cb3-955f-24b5501a09d6	50	2021-05-01 01:49:40.667+07	2021-05-01 01:49:40.667+07
f52ed6c9-89c0-410b-ad4d-ccfde386fa00	8ad9f3f5-f712-46d8-be65-0d1d3866c961	8bb8d9bd-fbd2-4cb3-955f-24b5501a09d6	2	2021-05-01 01:49:46.003+07	2021-05-01 01:49:46.003+07
\.


--
-- Data for Name: Transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Transactions" (id, "customerName", email, "EventId", "createdAt", "updatedAt") FROM stdin;
2fd56f17-746d-4403-a951-4b08c5e69482	Daniel	danielanugr@yahoo.co.id	af90b780-aede-4950-8fc2-4c33b9939156	2021-05-01 01:24:47.522+07	2021-05-01 01:24:47.522+07
5f7e2afb-4438-4efe-a428-a30bd5419651	Daniel	danielanugr@yahoo.co.id	af90b780-aede-4950-8fc2-4c33b9939156	2021-05-01 01:41:06.975+07	2021-05-01 01:41:06.975+07
e52ab6a8-fffa-44f6-90e3-939e712b8028	Daniel	danielanugr@yahoo.co.id	af90b780-aede-4950-8fc2-4c33b9939156	2021-05-01 01:41:24.951+07	2021-05-01 01:41:24.951+07
ff35c728-7b97-4e80-ad4a-c5f0ea48ab89	Daniel	danielanugr@yahoo.co.id	af90b780-aede-4950-8fc2-4c33b9939156	2021-05-01 01:44:06.836+07	2021-05-01 01:44:06.836+07
57e24748-93c7-475f-9464-ba8fee65002b	Sri Fatma	sri@gmail.com	af90b780-aede-4950-8fc2-4c33b9939156	2021-05-01 01:49:26.424+07	2021-05-01 01:49:26.424+07
5d580854-4a8f-41fd-a7e0-44e0ab32f075	Sri Fatma	sri@gmail.com	af90b780-aede-4950-8fc2-4c33b9939156	2021-05-01 01:49:40.65+07	2021-05-01 01:49:40.65+07
8ad9f3f5-f712-46d8-be65-0d1d3866c961	Sri Fatma	sri@gmail.com	af90b780-aede-4950-8fc2-4c33b9939156	2021-05-01 01:49:45.996+07	2021-05-01 01:49:45.996+07
\.


--
-- Name: Events Events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Events"
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY (id);


--
-- Name: Locations Locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY (id);


--
-- Name: Schedules Schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Schedules"
    ADD CONSTRAINT "Schedules_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Tickets Tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tickets"
    ADD CONSTRAINT "Tickets_pkey" PRIMARY KEY (id);


--
-- Name: TransactionTickets TransactionTickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TransactionTickets"
    ADD CONSTRAINT "TransactionTickets_pkey" PRIMARY KEY (id);


--
-- Name: Transactions Transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transactions"
    ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

