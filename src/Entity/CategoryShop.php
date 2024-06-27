<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CategoryShopRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoryShopRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['magasin' => 'exact'])]
class CategoryShop
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'categoryShops')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Magasin $magasin = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(nullable: true)]
    private ?int $ordre = null;

    #[ORM\OneToMany(targetEntity: ProductShop::class, mappedBy: 'categories')]
    private Collection $productShops;

    public function __construct()
    {
        $this->productShops = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getOrdre(): ?int
    {
        return $this->ordre;
    }

    public function setOrdre(?int $ordre): static
    {
        $this->ordre = $ordre;

        return $this;
    }

    /**
     * @return Collection<int, ProductShop>
     */
    public function getProductShops(): Collection
    {
        return $this->productShops;
    }

    public function addProductShop(ProductShop $productShop): static
    {
        if (!$this->productShops->contains($productShop)) {
            $this->productShops->add($productShop);
            $productShop->setCategories($this);
        }

        return $this;
    }

    public function removeProductShop(ProductShop $productShop): static
    {
        if ($this->productShops->removeElement($productShop)) {
            // set the owning side to null (unless already changed)
            if ($productShop->getCategories() === $this) {
                $productShop->setCategories(null);
            }
        }

        return $this;
    }
}
