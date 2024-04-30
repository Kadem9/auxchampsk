<?php

namespace App\Repository;

use App\Entity\MagasinTags;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MagasinTags>
 *
 * @method MagasinTags|null find($id, $lockMode = null, $lockVersion = null)
 * @method MagasinTags|null findOneBy(array $criteria, array $orderBy = null)
 * @method MagasinTags[]    findAll()
 * @method MagasinTags[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MagasinTagsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MagasinTags::class);
    }

    //    /**
    //     * @return MagasinTags[] Returns an array of MagasinTags objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('m.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?MagasinTags
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
