create database db_bruxo_vendas_ltda;

create table product(
	id bigserial primary key not null,
	product_bar_code varchar(20) not null,
	product_name varchar(100) not null,
	product_description varchar(255) not null,
	product_price numeric(16, 2) not null,
	date_register date not null
);