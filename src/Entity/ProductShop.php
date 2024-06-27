<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductShopRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductShopRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['magasin' => 'exact'])]
class ProductShop
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Products $product = null;

    #[ORM\Column(nullable: true)]
    private ?float $price = null;

    #[ORM\Column(nullable: true)]
    private ?int $quantity = null;

    #[ORM\Column(nullable: true)]
    private ?int $minimumQuantityPurchase = null;

    #[ORM\Column(nullable: true)]
    private ?int $maximumQuantityPurchase = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $origine = null;

    #[ORM\ManyToOne(inversedBy: 'productShops')]
    private ?CategoryShop $categories = null;

    #[ORM\ManyToOne(inversedBy: 'productShops')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Magasin $magasin = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateAddProduct = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): ?Products
    {
        return $this->product;
    }

    public function setProduct(?Products $product): static
    {
        $this->product = $product;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(?int $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getMinimumQuantityPurchase(): ?int
    {
        return $this->minimumQuantityPurchase;
    }

    public function setMinimumQuantityPurchase(?int $minimumQuantityPurchase): static
    {
        $this->minimumQuantityPurchase = $minimumQuantityPurchase;

        return $this;
    }

    public function getMaximumQuantityPurchase(): ?int
    {
        return $this->maximumQuantityPurchase;
    }

    public function setMaximumQuantityPurchase(?int $maximumQuantityPurchase): static
    {
        $this->maximumQuantityPurchase = $maximumQuantityPurchase;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getOrigine(): ?string
    {
        return $this->origine;
    }

    public function setOrigine(?string $origine): static
    {
        $this->origine = $origine;

        return $this;
    }

    public function getCategories(): ?CategoryShop
    {
        return $this->categories;
    }

    public function setCategories(?CategoryShop $categories): static
    {
        $this->categories = $categories;

        return $this;
    }

    public function getMagasin(): ?Magasin
    {
        return $this->magasin;
    }

    public function setMagasin(?Magasin $magasin): static
    {
        $this->magasin = $magasin;

        return $this;
    }

    public function getDateAddProduct(): ?\DateTimeInterface
    {
        return $this->dateAddProduct;
    }

    public function setDateAddProduct(?\DateTimeInterface $dateAddProduct): static
    {
        $this->dateAddProduct = $dateAddProduct;

        return $this;
    }
}
