import React from 'react';
import './assets/css/about.css';
import { motion } from 'framer-motion';
import {containerVariants, itemVariants} from "../HomeComponent/animations/header.js";


function MoreInfoApp() {
    const backgroundImage = "/assets/img/imgPageInfos/fond.png";
    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} id="more-info" className="more-info" style={{backgroundImage: `url(${backgroundImage})`}}>
                <motion.div variants={itemVariants} className="overlay">
                    <motion.h1 variants={itemVariants} className="big"><span className="gras">Fruits de saison, légumes locaux...</span>qualité <span
                        className="gras">garantie</span></motion.h1>
                    <motion.p variants={itemVariants} className="description">Dégustez les fruits de saison et les légumes de nos agriculteurs locaux,
                        pour une expérience authentique et responsable.</motion.p>
                    <motion.button variants={itemVariants} className="seasonal-fruits-button">Les fruits de saison</motion.button>
                    < motion.img variants={itemVariants} className="icon-fruits" src={"/assets/img/imgPageInfos/icone.png"}
                         alt="icon de plusieurs fruits"/>
                </motion.div>
            </motion.div>
            <div className="about-section">
                <img src={"/assets/img/imgPageInfos/imgQuiSommes.png"} alt="Qui sommes-nous" className="about-image"/>
                <div className="about-text">
                    <h3 className="title-about">Qui sommes-nous ?</h3>
                    <p>Bienvenue sur AuxChamps, né d'une passion pour l'agriculture locale et la consommation
                        responsable. Fondée en début 2024, notre plateforme est née de la volonté de soutenir nos
                        agriculteurs locaux et de promouvoir une alimentation saine et durable. De l'initiative scolaire
                        à une entreprise florissante, AuxChamps symbolise notre engagement envers l'agriculture locale
                        et la communauté. Rejoignez-nous pour façonner un avenir où chaque repas raconte une histoire de
                        terroir et de qualité.</p>
                </div>
            </div>

            <div className="raison-section">
                <h2 className="raison-title">3 raisons de faire son panier sur AuxChamps</h2>
                <div className="raison-cards">

                    <div className="raison-card">
                        <img src={"/assets/img/imgPageInfos/photo1.png"} alt="Soutenez nos agriculteurs"
                             className="raison-image"/>
                        <div className="raison-content">
                            <h3>Soutenez nos agriculteurs</h3>
                            <div className="green-line"></div>
                            <p>En optant pour AuxChamps, vous choisissez de soutenir l'agriculture locale, où les
                                agriculteurs sont maîtres de leur marché, garantissant ainsi un développement équitable
                                et durable pour nos communautés.</p>
                        </div>
                    </div>

                    <div className="raison-card">
                        <img src={"/assets/img/imgPageInfos/photo2.png"} alt="Frais et savoureux"
                             className="raison-image"/>
                        <div className="raison-content">
                            <h3>Frais et savoureux</h3>
                            <div className="green-line"></div>
                            <p>En optant pour AuxChamps, vous choisissez de soutenir l'agriculture locale, où les
                                agriculteurs sont maîtres de leur marché, garantissant ainsi un développement équitable
                                et durable pour nos communautés.</p>
                        </div>
                    </div>

                    <div className="raison-card">
                        <img src={"/assets/img/imgPageInfos/photo3.png"} alt="Choisissez un marché à proximité"
                             className="raison-image"/>
                        <div className="raison-content">
                            <h3>Choisissez un marché à proximité</h3>
                            <div className="green-line"></div>
                            <p>En optant pour AuxChamps, vous choisissez de soutenir l'agriculture locale, où les
                                agriculteurs sont maîtres de leur marché, garantissant ainsi un développement équitable
                                et durable pour nos communautés.</p>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}

export default MoreInfoApp;
