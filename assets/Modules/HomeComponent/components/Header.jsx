import { motion } from 'framer-motion';
import {containerVariants, itemVariants} from "../animations/header.js";

function Header() {

    return (
        <header className="header-homepage">
            <div className="container">
                <motion.div
                    className="header-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 variants={itemVariants}>
                        Du champ à votre assiette :<br/> qualité et équité
                    </motion.h1>
                    <motion.p className="presentation-site" variants={itemVariants}>
                        En choisissant AuxChamps, vous soutenez une rémunération équitable
                        pour nos agriculteurs
                        tout en vous garantissant des produits de qualité supérieure !
                    </motion.p>
                    <motion.button className="bouton-premier" variants={itemVariants}>
                        Voir les produits
                    </motion.button>
                </motion.div>
            </div>
        </header>
    );
}

export default Header;
