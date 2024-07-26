<?php

namespace App\Controller\API;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class EditProfilController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em)
    {
    }

    #[Route('/api/edit/profil/{id}', name: 'edit_profil', methods: ['POST'])]
    public function editProfil(Request $request, UserRepository $uRepo, string $id): JsonResponse
    {
        $user = $uRepo->findOneBy(['id' => $id]);

        $presentation = $request->get('presentation');
        /** @var UploadedFile $file */
        $file = $request->files->get('pictureProfil');

        if ($presentation) {
            $user->setPresentation($presentation);
        }

        if ($file) {
            $fileName = $this->uploadProfilePicture($file);
            $user->setPictureProfil($fileName);
        }

        $this->em->flush();

        return new JsonResponse(['message' => 'Profil modifié'], 200);
    }

    private function uploadProfilePicture(UploadedFile $file): string
    {
        $uploadDirectory = $this->getParameter('uploads_directory');
        $fileName = uniqid('', true) . '.' . $file->guessExtension();

        $file->move($uploadDirectory, $fileName);

        return $fileName;
    }
}
