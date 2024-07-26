<?php

namespace App\Repository;

use App\Entity\PortraitDuMois;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PortraitDuMois>
 *
 * @method PortraitDuMois|null find($id, $lockMode = null, $lockVersion = null)
 * @method PortraitDuMois|null findOneBy(array $criteria, array $orderBy = null)
 * @method PortraitDuMois[]    findAll()
 * @method PortraitDuMois[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PortraitDuMoisRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PortraitDuMois::class);
    }

//    /**
//     * @return PortraitDuMois[] Returns an array of PortraitDuMois objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PortraitDuMois
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
