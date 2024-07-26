<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240630143609 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE fruit_du_mois (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, mois VARCHAR(255) NOT NULL, INDEX IDX_837C01E74584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE portrait_du_mois (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, magasin_id INT DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, photo VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, INDEX IDX_6816EA67A76ED395 (user_id), INDEX IDX_6816EA6720096AE3 (magasin_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE fruit_du_mois ADD CONSTRAINT FK_837C01E74584665A FOREIGN KEY (product_id) REFERENCES products (id)');
        $this->addSql('ALTER TABLE portrait_du_mois ADD CONSTRAINT FK_6816EA67A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE portrait_du_mois ADD CONSTRAINT FK_6816EA6720096AE3 FOREIGN KEY (magasin_id) REFERENCES magasin (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fruit_du_mois DROP FOREIGN KEY FK_837C01E74584665A');
        $this->addSql('ALTER TABLE portrait_du_mois DROP FOREIGN KEY FK_6816EA67A76ED395');
        $this->addSql('ALTER TABLE portrait_du_mois DROP FOREIGN KEY FK_6816EA6720096AE3');
        $this->addSql('DROP TABLE fruit_du_mois');
        $this->addSql('DROP TABLE portrait_du_mois');
    }
}
