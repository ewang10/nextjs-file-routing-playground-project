import Link from "next/link";

import classes from './button.module.css';

const Button = ({ children, link }) => (
    <Link href={link} className={classes.btn}>{children}</Link>
);

export default Button;
