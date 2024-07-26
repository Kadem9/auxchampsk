<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\SocieteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SocieteRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['societe:read']],
    denormalizationContext: ['groups' => ['societe:write']]
)]
#[ApiFilter(SearchFilter::class, properties: ['dirigeant' => 'exact'])]
class Societe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['societe:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['societe:read', 'societe:write'])]
    private ?string $nom = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['societe:read', 'societe:write'])]
    private ?string $adresseSiege = null;

    #[ORM\ManyToOne(inversedBy: 'societes')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['societe:read', 'societe:write'])]
    private ?User $dirigeant = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['societe:read', 'societe:write'])]
    private ?string $statutJuridique = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['societe:read', 'societe:write'])]
    private ?string $siret = null;

    #[ORM\OneToMany(targetEntity: Magasin::class, mappedBy: 'societe')]
    #[Groups(['societe:read'])]
    private Collection $magasins;

    #[ORM\OneToMany(targetEntity: Order::class, mappedBy: 'societe')]
    private Collection $orders;

    public function __construct()
    {
        $this->magasins = new ArrayCollection();
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(?string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getAdresseSiege(): ?string
    {
        return $this->adresseSiege;
    }

    public function setAdresseSiege(?string $adresseSiege): static
    {
        $this->adresseSiege = $adresseSiege;

        return $this;
    }

    public function getDirigeant(): ?User
    {
        return $this->dirigeant;
    }

    public function setDirigeant(?User $dirigeant): static
    {
        $this->dirigeant = $dirigeant;

        return $this;
    }

    public function getStatutJuridique(): ?string
    {
        return $this->statutJuridique;
    }

    public function setStatutJuridique(?string $statutJuridique): static
    {
        $this->statutJuridique = $statutJuridique;

        return $this;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(?string $siret): static
    {
        $this->siret = $siret;

        return $this;
    }

    /**
     * @return Collection<int, Magasin>
     */
    public function getMagasins(): Collection
    {
        return $this->magasins;
    }

    public function addMagasin(Magasin $magasin): static
    {
        if (!$this->magasins->contains($magasin)) {
            $this->magasins->add($magasin);
            $magasin->setSociete($this);
        }

        return $this;
    }

    public function removeMagasin(Magasin $magasin): static
    {
        if ($this->magasins->removeElement($magasin)) {
            // set the owning side to null (unless already changed)
            if ($magasin->getSociete() === $this) {
                $magasin->setSociete(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setSociete($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getSociete() === $this) {
                $order->setSociete(null);
            }
        }

        return $this;
    }
}
