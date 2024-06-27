<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240611135655 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE product_shop (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, categories_id INT DEFAULT NULL, magasin_id INT NOT NULL, price DOUBLE PRECISION DEFAULT NULL, quantity INT DEFAULT NULL, minimum_quantity_purchase INT DEFAULT NULL, maximum_quantity_purchase INT DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, origine VARCHAR(255) DEFAULT NULL, date_add_product DATETIME DEFAULT NULL, INDEX IDX_21826E034584665A (product_id), INDEX IDX_21826E03A21214B7 (categories_id), INDEX IDX_21826E0320096AE3 (magasin_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE product_shop ADD CONSTRAINT FK_21826E034584665A FOREIGN KEY (product_id) REFERENCES products (id)');
        $this->addSql('ALTER TABLE product_shop ADD CONSTRAINT FK_21826E03A21214B7 FOREIGN KEY (categories_id) REFERENCES category_shop (id)');
        $this->addSql('ALTER TABLE product_shop ADD CONSTRAINT FK_21826E0320096AE3 FOREIGN KEY (magasin_id) REFERENCES magasin (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product_shop DROP FOREIGN KEY FK_21826E034584665A');
        $this->addSql('ALTER TABLE product_shop DROP FOREIGN KEY FK_21826E03A21214B7');
        $this->addSql('ALTER TABLE product_shop DROP FOREIGN KEY FK_21826E0320096AE3');
        $this->addSql('DROP TABLE product_shop');
    }
}
