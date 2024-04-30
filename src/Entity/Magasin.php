<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MagasinRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MagasinRepository::class)]
#[ApiResource]
class Magasin
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'magasins')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $nom = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateCreation = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $logo = null;

    #[ORM\ManyToOne(inversedBy: 'magasins')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Societe $societe = null;

    #[ORM\Column(length: 255)]
    private ?string $rue = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $codePostal = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $ville = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isInformationExact = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isCgu = null;

    #[ORM\OneToMany(targetEntity: MagasinTags::class, mappedBy: 'magasin')]
    private Collection $magasinTags;

    public function __construct()
    {
        $this->magasinTags = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
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

    public function getDateCreation(): ?\DateTimeInterface
    {
        return $this->dateCreation;
    }

    public function setDateCreation(?\DateTimeInterface $dateCreation): static
    {
        $this->dateCreation = $dateCreation;

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

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): static
    {
        $this->logo = $logo;

        return $this;
    }

    public function getSociete(): ?Societe
    {
        return $this->societe;
    }

    public function setSociete(?Societe $societe): static
    {
        $this->societe = $societe;

        return $this;
    }

    public function getRue(): ?string
    {
        return $this->rue;
    }

    public function setRue(string $rue): static
    {
        $this->rue = $rue;

        return $this;
    }

    public function getCodePostal(): ?string
    {
        return $this->codePostal;
    }

    public function setCodePostal(?string $codePostal): static
    {
        $this->codePostal = $codePostal;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(?string $ville): static
    {
        $this->ville = $ville;

        return $this;
    }

    public function isIsInformationExact(): ?bool
    {
        return $this->isInformationExact;
    }

    public function setIsInformationExact(?bool $isInformationExact): static
    {
        $this->isInformationExact = $isInformationExact;

        return $this;
    }

    public function isIsCgu(): ?bool
    {
        return $this->isCgu;
    }

    public function setIsCgu(?bool $isCgu): static
    {
        $this->isCgu = $isCgu;

        return $this;
    }

    /**
     * @return Collection<int, MagasinTags>
     */
    public function getMagasinTags(): Collection
    {
        return $this->magasinTags;
    }

    public function addMagasinTag(MagasinTags $magasinTag): static
    {
        if (!$this->magasinTags->contains($magasinTag)) {
            $this->magasinTags->add($magasinTag);
            $magasinTag->setMagasin($this);
        }

        return $this;
    }

    public function removeMagasinTag(MagasinTags $magasinTag): static
    {
        if ($this->magasinTags->removeElement($magasinTag)) {
            // set the owning side to null (unless already changed)
            if ($magasinTag->getMagasin() === $this) {
                $magasinTag->setMagasin(null);
            }
        }

        return $this;
    }
}
