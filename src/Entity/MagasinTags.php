<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MagasinTagsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MagasinTagsRepository::class)]
#[ApiResource]
class MagasinTags
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Tags $tag = null;

    #[ORM\ManyToOne(inversedBy: 'magasinTags')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Magasin $magasin = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTag(): ?Tags
    {
        return $this->tag;
    }

    public function setTag(?Tags $tag): static
    {
        $this->tag = $tag;

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
}
