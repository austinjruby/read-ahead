--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

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

SET default_with_oids = false;

--
-- Name: books; Type: TABLE; Schema: public; Owner: austinruby
--

CREATE TABLE public.books (
    id integer NOT NULL,
    title character varying NOT NULL,
    author character varying NOT NULL
);


ALTER TABLE public.books OWNER TO austinruby;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: austinruby
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO austinruby;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: austinruby
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: user_books; Type: TABLE; Schema: public; Owner: austinruby
--

CREATE TABLE public.user_books (
    user_id integer NOT NULL,
    book_id integer NOT NULL,
    read boolean DEFAULT false NOT NULL
);


ALTER TABLE public.user_books OWNER TO austinruby;

--
-- Name: users; Type: TABLE; Schema: public; Owner: austinruby
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO austinruby;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: austinruby
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO austinruby;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: austinruby
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: austinruby
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: austinruby
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: austinruby
--

COPY public.books (id, title, author) FROM stdin;
37	east of eden	john steinbeck
39	the painted bird	jerzy kosinski
40	a breath of fresh air	leaford n. shakes
41	ready player one	ernest cline
42	tough guys don't dance	norman mailer
43	the third man	graham greene
44	the catcher in the rye and philosophy	keith dromm
45	the catcher in the rye	j. d. salinger
46	billiards at half-past nine	heinrich boll
47	the adventures of huckleberry finn (tom sawyer's comrade) ...	mark twain
48	pinball	jerzy kosinski
\.


--
-- Data for Name: user_books; Type: TABLE DATA; Schema: public; Owner: austinruby
--

COPY public.user_books (user_id, book_id, read) FROM stdin;
1	45	f
2	39	f
2	47	f
2	41	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: austinruby
--

COPY public.users (id, username, password) FROM stdin;
1	wzevon	life
2	bjshaver	coal
\.


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: austinruby
--

SELECT pg_catalog.setval('public.books_id_seq', 48, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: austinruby
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: austinruby
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: user_books user_books_pkey; Type: CONSTRAINT; Schema: public; Owner: austinruby
--

ALTER TABLE ONLY public.user_books
    ADD CONSTRAINT user_books_pkey PRIMARY KEY (user_id, book_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: austinruby
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: austinruby
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: user_books user_books_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: austinruby
--

ALTER TABLE ONLY public.user_books
    ADD CONSTRAINT user_books_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_books user_books_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: austinruby
--

ALTER TABLE ONLY public.user_books
    ADD CONSTRAINT user_books_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

