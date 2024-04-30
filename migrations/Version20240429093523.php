<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240429093523 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE magasin (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, societe_id INT NOT NULL, nom VARCHAR(255) DEFAULT NULL, date_creation DATE DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, logo VARCHAR(255) DEFAULT NULL, rue VARCHAR(255) NOT NULL, code_postal VARCHAR(255) DEFAULT NULL, ville VARCHAR(255) DEFAULT NULL, is_information_exact TINYINT(1) DEFAULT NULL, is_cgu TINYINT(1) DEFAULT NULL, INDEX IDX_54AF5F27A76ED395 (user_id), INDEX IDX_54AF5F27FCF77503 (societe_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE magasin_tags (id INT AUTO_INCREMENT NOT NULL, tag_id INT NOT NULL, magasin_id INT NOT NULL, INDEX IDX_DEE58AD0BAD26311 (tag_id), INDEX IDX_DEE58AD020096AE3 (magasin_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE societe (id INT AUTO_INCREMENT NOT NULL, dirigeant_id INT NOT NULL, nom VARCHAR(255) DEFAULT NULL, adresse_siege VARCHAR(255) DEFAULT NULL, statut_juridique VARCHAR(255) DEFAULT NULL, siret VARCHAR(255) DEFAULT NULL, INDEX IDX_19653DBDE233AF25 (dirigeant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tags (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE magasin ADD CONSTRAINT FK_54AF5F27A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE magasin ADD CONSTRAINT FK_54AF5F27FCF77503 FOREIGN KEY (societe_id) REFERENCES societe (id)');
        $this->addSql('ALTER TABLE magasin_tags ADD CONSTRAINT FK_DEE58AD0BAD26311 FOREIGN KEY (tag_id) REFERENCES tags (id)');
        $this->addSql('ALTER TABLE magasin_tags ADD CONSTRAINT FK_DEE58AD020096AE3 FOREIGN KEY (magasin_id) REFERENCES magasin (id)');
        $this->addSql('ALTER TABLE societe ADD CONSTRAINT FK_19653DBDE233AF25 FOREIGN KEY (dirigeant_id) REFERENCES `user` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE magasin DROP FOREIGN KEY FK_54AF5F27A76ED395');
        $this->addSql('ALTER TABLE magasin DROP FOREIGN KEY FK_54AF5F27FCF77503');
        $this->addSql('ALTER TABLE magasin_tags DROP FOREIGN KEY FK_DEE58AD0BAD26311');
        $this->addSql('ALTER TABLE magasin_tags DROP FOREIGN KEY FK_DEE58AD020096AE3');
        $this->addSql('ALTER TABLE societe DROP FOREIGN KEY FK_19653DBDE233AF25');
        $this->addSql('DROP TABLE magasin');
        $this->addSql('DROP TABLE magasin_tags');
        $this->addSql('DROP TABLE societe');
        $this->addSql('DROP TABLE tags');
    }
}
